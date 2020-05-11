import React, { useContext } from "react"
import Cookies from 'js-cookie'

import AuthApi from '../authApi'


export default function Dashboard(props) {
   const Auth = useContext(AuthApi)

   const handleLogout = () => {
      console.log(Auth.user)
      Cookies.remove(Auth.user.users_first_name)
      Auth.setUser({})
   }


   return (
      <button onClick={handleLogout}>Logout</button>
   )
}