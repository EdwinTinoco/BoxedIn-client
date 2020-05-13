import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopProductsSlider from '../home/top-products-slider';
import TopDealsByEmail from '../home/top-deals-email';

export default function () {
    return (
        <div className="home-main-wrapper">
            <div className="hero-section">

            </div>

            <div className="top-heading">
                <h1>Sorprise Box for Everyone!!</h1>
            </div>

            <TopProductsSlider />
            <TopDealsByEmail />
        </div>
    );
}