import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../../../static/assets/images/logo/Original-on-Transparent.png'
import { AuthApi } from '../authApi'

export default function NavigationContainer() {
    const [adminLinkVisible, setAdminLinkVisible] = useState('none')

    // const { loggedInUser } = useContext(AuthApi)

    // useEffect(() => {
    //     if (loggedInUser.users_role === 'admin') {
    //         setAdminLinkVisible('block')
    //     }
    // }, [])

    return (
        <div className="navigation-main-wrapper">
            <div className="left-column">
                <Link to="/">
                    <img src={Logo} alt='Logo' />
                </Link>
            </div>
            <div className="center-column">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-links">
                    <Link to="/About">About</Link>
                </div>
                <div className="nav-links">
                    <Link to="/Products">Products</Link>
                </div>
                <div className="nav-links">
                    <Link to="/AdminSettings" style={{
                        display: `${adminLinkVisible}`
                    }}>Admin Settings</Link>
                </div>
            </div>
            <div className="right-column">
                <div className="login-icon">
                    <Link to="/login">
                        <FontAwesomeIcon icon="user" />
                    </Link>
                    {/* <div className="sign-in">
                        {loggedInUser.users_role === 'admin' || loggedInUser.users_role === 'user' ?
                            `${loggedInUser.users_first_name}` : `Sign In`}
                    </div> */}
                </div>
                <div className="cart-icon">
                    {/* <Link to={`/cart-items/user/${loggedInUser.users_id}`}> */}
                    <Link to={`/cart-items/user/${31}`}>
                        <FontAwesomeIcon icon="shopping-cart" />
                    </Link>
                </div>
            </div>
        </div>
    );

}