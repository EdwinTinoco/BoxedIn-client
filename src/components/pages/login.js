import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'

import Logo from '../../../static/assets/images/logo/Original-on-Transparent.png'

import AuthApi from '../authApi'


export default function Login(props) {

   const [loginEmail, setLoginEmail] = useState('')
   const [loginPassword, setLoginPassword] = useState('')
   const [loginError, setLoginError] = useState("")

   const Auth = useContext(AuthApi)

   function handleLoginSubmit(event) {
      event.preventDefault();

      setLoginError("")

      axios.get(`https://ejt-boxedin-api.herokuapp.com/users`)
         .then(response => {

            response.data.forEach(user => {
               if (loginEmail === user.users_email) {
                  if (loginPassword === user.users_password) {
                     Auth.setUser(user)
                     Cookies.set("user", user.users_id, { expires: 7 })

                     setLoginError("credentials corrects")
                  } else {
                     setLoginError("Email or password is incorrect!!")
                  }
               } else {
                  setLoginError("Email or password is incorrect!!")
               }
            })
         })
   }

   return (
      <div className='login-main-wrapper'>
         <div className="login-content-wrapper">
            <div className="logo-wrapper">
               <img src={Logo} alt='Logo' />
            </div>

            <div className="login-wrapper">
               <div className='title'>
                  <h1>LOGIN TO YOUR ACCOUNT</h1>
               </div>

               <div className="login-form-wrapper">
                  <form onSubmit={handleLoginSubmit}>
                     <input
                        className='input-field'
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={loginEmail}
                        onChange={({ target }) => { setLoginEmail(target.value) }}
                     />

                     <input
                        className='input-field'
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={loginPassword}
                        onChange={({ target }) => { setLoginPassword(target.value) }}
                     />
                     <div>
                        <p>{loginError}</p>
                     </div>
                     <div className='form-button-container'>
                        <button type="submit" className='form-button'>LOGIN</button>
                     </div>
                  </form>

                  <div>
                     <hr />
                     <Link className='new-account-button-link' to='/register'>
                        <div className='register-link'>
                           Don't have an account? Register here
                     </div>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="hero-login">
            <h2>The best Boxes Presents Sorprises for everyone with the best deals</h2>
            <h3>Get you Boxed Present for someone special to you!!!</h3>
         </div>
      </div>
   );
}