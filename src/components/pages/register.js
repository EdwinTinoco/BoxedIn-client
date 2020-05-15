import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import Cookies from 'js-cookie'


export default function Register(props) {
   const [userFirstName, setUserFirstName] = useState('')
   const [userLastName, setUserLastName] = useState('')
   const [userEmail, setUserEmail] = useState('')
   const [userAddress, setUserAddress] = useState("")
   const [userZipCode, setUserZipCode] = useState('')
   const [userPassword, setUserPassword] = useState("")
   const [messageUser, setMessageUser] = useState("")

   const handleSubmitNewUser = () => {
      event.preventDefault();

      axios
         .post(
            'https://ejt-boxedin-api.herokuapp.com/add-user',
            {
               users_first_name: userFirstName,
               users_last_name: userLastName,
               users_email: userEmail,
               users_address: userAddress,
               users_zip_code: userZipCode,
               users_password: userPassword,
               users_role: "user"
            },
         )
         .then(response => {
            setUserFirstName('')
            setUserLastName('')
            setUserEmail('')
            setUserAddress('')
            setUserZipCode('')
            setUserPassword('')
            setMessageUser("User Added Succesfully!")
         })
         .catch(error => {
            console.log('handleSubmitNewUser error', error)
         })
   }


   return (
      <div className="dashboard-main-wrapper">
         <div className="add-form-wrapper">

            <div className="add-form-wrapper">
               <h1>Add new User</h1>
               <form onSubmit={handleSubmitNewUser} className="add-forms">
                  <input type='text'
                     value={userFirstName}
                     onChange={({ target }) => { setUserFirstName(target.value) }}
                     className='new-entry-input'
                     placeholder='Enter User First Name'>
                  </input>

                  <input type='text'
                     value={userLastName}
                     onChange={({ target }) => { setUserLastName(target.value) }}
                     className='new-entry-input'
                     placeholder='Enter User Last Name'>
                  </input>

                  <input type='email'
                     className='new-entry-input'
                     value={userEmail}
                     onChange={({ target }) => { setUserEmail(target.value) }}
                     placeholder='Enter User Email'>
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userAddress}
                     onChange={({ target }) => { setUserAddress(target.value) }}
                     placeholder='Enter User Address'>
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userZipCode}
                     onChange={({ target }) => { setUserZipCode(target.value) }}
                     placeholder='Enter User Zip Code'>
                  </input>

                  <input type='password'
                     className='new-entry-input'
                     value={userPassword}
                     onChange={({ target }) => { setUserPassword(target.value) }}
                     placeholder='Enter User Password'>
                  </input>

                  <button type='submit' className='add-button'>Submit</button>
               </form>

            </div>
         </div>
      </div>
   )
}