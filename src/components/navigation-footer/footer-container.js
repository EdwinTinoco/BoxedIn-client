import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../../../static/assets/images/logo/White-on-Transparent.png'

export default function () {
    return (
        <div className="footer-main-wrapper">
            <div className="img-links-wrapper">
                <div className="left-column">
                    <img src={Logo} alt='Logo' />
                </div>

                <div className="center-column">
                    <div className="links-wrapper">
                        <div className="nav-links">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="nav-links">
                            <Link to="/about">About</Link>
                        </div>
                        <div className="nav-links">
                            <Link to="/products">Products</Link>
                        </div>
                    </div>
                </div>

                {/* <div className="right-column">
                    <div className="facebook">
                        <FontAwesomeIcon icon="facebookf" />
                    </div>
                    <div className="instagram">
                        <FontAwesomeIcon icon="facebookf" />
                    </div>
                </div> */}
            </div>

            <div className="copyright">
                &copy; 2020 Boxed In Co. &#124; All rights reserved (it's a demo for a school project)
            </div>
        </div>
    );
}