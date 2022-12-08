import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { config } from './config';

function Resetpassword() {

    const params = useParams();
    const navigate = useNavigate();

    const[loading,setloading] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.password || !values.confirm) {
                error.confirm = "Please Enter Password";
            }

            if (values.password !== values.confirm) {
                error.confirm = "Password Mismatch";
            }

            return error
        },
        onSubmit : async(values)=>{
            try {
                setloading(true);
                
                await axios.post(`${config.api}/reset/reset-password/${params.id}/${params.token}`,values);
                setloading(false);
                alert("Password Updated");
                navigate("/")
            } catch (error) {
                console.log("Error in Reset Password")
            }
        }
    })
    return (
        <div id='reset'>
            <div class="background"></div>
            <div class="card mt-5">
                <h2>RESET PASSWORD</h2>
                <form onSubmit={formik.handleSubmit} class="form">
                    <input type="password"
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Password..." />
                    <input type="password"
                        name='confirm'
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`${formik.errors.confirm ? 'error-box' : ''} 
                        ${formik.touched.confirm && !formik.errors.confirm ? 'success-box' : ''}`}
                        placeholder="Confirm Password..." />
                    {
                        formik.errors.confirm ? <span style={{ color: "red" }}>{formik.errors.confirm}</span> : null
                    }
                    {
                        loading ? <button type="submit" disabled>
                        <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </button>
                        :
                        <button type="submit">RESET</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Resetpassword