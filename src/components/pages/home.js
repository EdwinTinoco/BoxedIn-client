import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopProductsSlider from '../home/top-products-slider';
import TopDealsByEmail from '../home/top-deals-email';
// import PaypalCheckoutButton from "../paypal/paypal-checkout-button"

export default function () {

    // const order = {
    //     customer: "123456",
    //     total: "550.00",
    //     items: [
    //         {
    //             sku: '112',
    //             name: 'Camisa ReactJS',
    //             price: '300.00',
    //             quantity: 1,
    //             currency: "USD"
    //         },
    //         {
    //             sku: '99',
    //             name: 'Camisa JS',
    //             price: '125.00',
    //             quantity: 2,
    //             currency: "USD"
    //         }
    //     ]
    // }

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

            {/* <PaypalCheckoutButton order={order} /> */}

        </div>
    );
}