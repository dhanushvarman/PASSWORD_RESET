import axios from 'axios'
import React from 'react'
import { config } from './config'

function Forgotpassword() {

    async function reset(){
        try {
            var values = {email : document.getElementById("login-input-user").value};
            const data = await axios.post(`${config.api}/forgot-password`,values)
            alert(data.data.message)
        } catch (error) {
            alert("User Not Found")
            console.log("Error in Forgot Password")
        }
    }
    return (
        <section id='forgot'  style={{height:"900px",marginTop:"-70px"}}>
            <div style={{height:"70px"}}>

            </div>
            <div class="login-container">
                <form action="" class="form-login">
                    <ul class="login-nav">
                        <li class="login-nav__item active">
                            <a href="#">Password Reset</a>
                        </li>
                    </ul>
                    <label class="login__label">
                        Email
                    </label>
                    <input id="login-input-user" class="login__input" type="email" />
                    <input class="login__submit mt-5 text-center" onClick={reset} value="Reset Password"/>
                </form>
            </div>
        </section>
    )
}

export default Forgotpassword