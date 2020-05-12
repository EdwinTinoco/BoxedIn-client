import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopProductsSlider from '../home/top-products-slider';
import TopDealsByEmail from '../home/top-deals-email';

export default function () {
    return (
        <div className="home-main-wrapper">
            <div className="hero-section">
                <div className="top-heading">
                    <h1>Home Page</h1>
                </div>
                <div className="middle-content">
                    <p>Middle content</p>
                </div>
                <div className="bottom-button">
                    <button type="button">Contac Us</button>
                </div>
            </div>

            <TopProductsSlider />
            <TopDealsByEmail />
        </div>
    );
}