import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
import Cookies from 'js-cookie'

import Logo from '../../../static/assets/images/logo/Original-on-Transparent.png'
import AuthApi from '../authApi'

export default function NavigationContainer(props) {
    const [userId, setUserId] = useState(Cookies.get("user"))
    const [userName, setUserName] = useState("")
    const [currentUser, setCurrentUser] = useState({})
    const [adminLinkVisible, setAdminLinkVisible] = useState('none')
    const [iconLogout, setIconLogout] = useState(false)

    const Auth = useContext(AuthApi)

    const handleLogout = () => {
        setUserId(0)
        setIconLogout(false)
        setUserName("Sign In")
        setAdminLinkVisible("none")
        setCurrentUser({})
        Cookies.remove("user")
        Auth.setUser({})
    }

    const getCurrentUser = () => {
        axios.get(`https://ejt-boxedin-api.herokuapp.com/user/${userId}`)
            .then(res => {
                setCurrentUser(res.data[0])
                if (res.data[0].users_role === "admin") {
                    setUserName(res.data[0].users_first_name)
                    setAdminLinkVisible("block")
                } else if (res.data[0].users_role === "user") {
                    setUserName(res.data[0].users_first_name)
                    setAdminLinkVisible("none")
                }
            })
            .catch(err => {
                console.log("getCurrentUser error", err)
            })
    }

    const setStyle = () => {
        console.log("Auth User al entrar la 1ra vez", Auth.user, userId)
        if (Object.entries(Auth.user).length > 0) {
            if (Auth.user.users_role !== undefined) {
                if (Auth.user.users_role === "admin") {
                    return { display: "block" }
                } else {
                    return { display: "none" }
                }
            } else if (userId > 0 || userId !== undefined) {
                if (currentUser.users_role === "admin") {
                    return { display: "block" }
                } else {
                    return { display: "none" }
                }
            }
        } else if (userId > 0 || userId !== undefined) {
            if (currentUser.users_role === "admin") {
                return { display: "block" }
            } else {
                return { display: "none" }
            }
        }
    }

    useEffect(() => {
        if (userId === 0 || userId === undefined) {
            setUserId(0)
            setIconLogout(false)
            setUserName("Sign In")
            setAdminLinkVisible("none")
        } else {
            setUserId(Cookies.get("user"))
            setIconLogout(true)
            getCurrentUser()
            setAdminLinkVisible("block")
        }
    }, [])


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
                    <Link to="/about">About</Link>
                </div>
                <div className="nav-links">
                    <Link to="/aroducts">Products</Link>
                </div>
                <div className="nav-links" style={setStyle()}>
                    <Link to="/dashboard" >Dashboard</Link>
                </div>
            </div>

            <div className="right-column">
                <div className="login-logout-wrapper">
                    {Object.entries(Auth.user).length > 0 ? (
                        <div className="logout-icon">
                            <FontAwesomeIcon onClick={handleLogout} icon="sign-out-alt" />
                        </div>
                    )
                        :
                        iconLogout ?
                            <div className="logout-icon">
                                <FontAwesomeIcon onClick={handleLogout} icon="sign-out-alt" />
                            </div>
                            :
                            <div className="login-icon">
                                <Link to="/login">
                                    <FontAwesomeIcon icon="user" />
                                </Link>
                            </div>
                    }

                    <div className="sign-in">
                        {Auth.user.users_first_name || userName}
                    </div>
                </div>
                <div className="cart-icon">
                    <Link to={`/cart-items/user/${userId || Auth.user.users_id}`}>
                        <FontAwesomeIcon icon="shopping-cart" />
                    </Link>
                </div>
            </div>
        </div>
    );

}