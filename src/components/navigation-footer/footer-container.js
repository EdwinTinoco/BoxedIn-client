import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../../../static/assets/images/logo/White-on-Transparent.png'

export default function () {
    return (
        <div className="footer-main-wrapper">
            <div className="left-column">
                <img src={Logo} alt='Logo' />
            </div>

            <div className="center-column">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-links">
                    <Link to="/about">About</Link>
                </div>
                <div className="nav-links">
                    <Link to="/products">Products</Link>
                </div>

                <div className="copyright">
                    <p>Copyright</p>
                </div>
            </div>

            <div className="social-media">
                {/* <FontAwesomeIcon icon="facebookf" /> */}
            </div>
        </div>
    );
}