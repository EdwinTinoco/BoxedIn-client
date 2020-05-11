import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function TopProductsSlider() {
    const [products, setProducts] = useState([])

    let settings = {
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        dots: true,

        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            }
        ]
    }

    useEffect(() => {
        axios.get("https://ejt-boxedin-api.herokuapp.com/products")
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.log("get all Products error: ", error);
            })
    }, [])

    return (
        <div className="slides-wrapper">
            <h2>Top products recommended by our customers</h2>

            <Slider {...settings}>
                {products.map(product => (
                    product.products_stars > 25 ? (
                        <div className="out" key={product.products_id}>
                            <div className="card">
                                <img className="rounded-circle" alt={"product image"} src={product.products_image_url} height={150} width={150} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.products_name}</h5>
                                    <Link to={`/product/${product.products_id}`}>
                                        <button className="btn btn-sm follow btn-primary">Buy</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (null)
                ))}
            </Slider>

        </div>
    );
}