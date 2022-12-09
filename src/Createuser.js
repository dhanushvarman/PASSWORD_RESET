import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from './config'

function Createuser() {

    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirm: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.email) {
                error.email = "Please Enter a Email";
            }

            if (!values.password || !values.confirm) {
                error.confirm = "Please Enter Password";
            }

            if (values.password !== values.confirm) {
                error.confirm = "Password Mismatch";
            }

            return error
        },
        onSubmit: async(values)=>{
            delete values.confirm
            try {
                setloading(true)
                await axios.post(`${config.api}/create`,values);
                setloading(false)
                alert("User Created")
            } catch (error) {
                setloading(false)
                console.log(error)
            }
        }
    })
    
    function redirect() {

        navigate("/forgot-password")
    }

    return (
        <section id='forgot' style={{ height: "900px", marginTop: "-70px" }}>
            <div style={{ height: "70px" }}>

            </div>
            <div class="login-container">

                <form onSubmit={formik.handleSubmit} class="form-login">
                    <ul class="login-nav">
                        <li class="login-nav__item active">
                            <a href="#">Create user</a>
                        </li>
                    </ul>
                    <label class="login__label">
                        Email
                    </label>
                    <input id="login-input-user"
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`login__input ${formik.errors.email ? 'error-box' : ''} 
                    ${formik.touched.email && !formik.errors.email ? 'success-box' : ''}`}
                        type="email" />
                    {
                        formik.errors.email ? <span style={{ color: "red" }}>{formik.errors.email}</span> : null
                    }
                    <label class="login__label mt-3">
                        Password
                    </label>
                    <input id="login-input-user"
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        class="login__input"
                        type="password" />
                    <label class="login__label">
                        Confirm Password
                    </label>
                    <input id="login-input-user"
                        name='confirm'
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`login__input ${formik.errors.confirm ? 'error-box' : ''} 
                    ${formik.touched.confirm && !formik.errors.confirm ? 'success-box' : ''}`}
                        type="password" />
                    {
                        formik.errors.confirm ? <span style={{ color: "red" }}>{formik.errors.confirm}</span> : null
                    }
                    {
                        loading ? <button class="login__submit mt-5" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Creating...
                        </button>
                            :
                            <input class={`login__submit mt-5 text-center`} type={"submit"} value="Create User"/>
                    }
                    <input class="login__submit mt-5 text-center" onClick={redirect} value="Forgot Password" />
                </form>
            </div>
        </section>
    )
}

export default Createuser