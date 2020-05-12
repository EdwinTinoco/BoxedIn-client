import React, { useContext } from "react"
import Cookies from 'js-cookie'

import AuthApi from '../authApi'


export default function Dashboard(props) {
   const Auth = useContext(AuthApi)

   const handleLogout = () => {
      console.log(Auth.user.users_first_name)
      Cookies.remove("user")
      Auth.setUser({})
   }


   return (
      <button onClick={handleLogout}>Logout</button>
   )
}