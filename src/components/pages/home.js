import React from 'react';

import TopProductsSlider from '../home/top-products-slider';
import TopDealsByEmail from '../home/top-deals-email';

export default function () {
    return (
        <div className="home-main-wrapper">
            <div className="hero-section">
                <div className="background-image">
                    {/* Aqui va la imagen */}
                </div>
                <div className="top-heading">
                    <h1>Surprise Box for Everyone!!</h1>
                </div>
            </div>

            <TopProductsSlider />
            <TopDealsByEmail />
        </div>
    );
}