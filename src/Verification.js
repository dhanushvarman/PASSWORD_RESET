import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from './config';

function Verification() {

    const params = useParams();
    const navigate = useNavigate();

    const [string, setString] = useState();

    useEffect(() => {
        async function fetchData() {

            try {
                const data = await axios.get(`${config.api}/${params.id}`);
                setString(data.data.random)
            } catch (error) {
                console.log("Error in Getting User")
            }
        }
        fetchData();
    }, [])

    const formik = useFormik({
        initialValues: {
            code: ""
        },
        validate: (values) => {

            let error = {};

            if (!values.code) {
                error.code = "Please Enter a Code"
            }

            return error
        },
        onSubmit: (values) => {
            console.log(values)
            if (values.code == string) {
                alert("Verified");
                navigate(`/reset-password/${params.id}/${params.token}`)
            } else {
                alert("Code Incorrect")
            }
        }
    })

    return (
        <div id="verification">
            <div class="login" style={{ height: "500px" }}>
                <h2 >Verification</h2>

                <form class="login-form" style={{ marginTop: "70px" }} onSubmit={formik.handleSubmit}>
                    <div class="textbox">
                        <input type="text"
                            name='code'
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.code ? 'error-box' : ''} 
                        ${formik.touched.code && !formik.errors.code ? 'success-box' : ''}`}
                            placeholder="Enter the Verification Code" />

                    </div>
                    {
                        formik.errors.code ? <span style={{ color: "red" }}>{formik.errors.code}</span> : null
                    }
                    <input type="submit" className='mt-4 btn btn-primary' value={"VERIFY"} />
                </form>
            </div>
        </div>
    )
}

export default Verification