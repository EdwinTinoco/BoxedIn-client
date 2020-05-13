import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProductsItem extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {
         products_id,
         products_name,
         products_description,
         products_inventory,
         products_image_url,
         products_categories,
         products_stars,
         products_price
      } = this.props.item;

      return (

         <div className="product-item-wrapper">
            <div className='product-category'>
               <p>{products_categories}</p>
            </div>

            <div className='product-image'>
               <img src={products_image_url} alt='Product display' />
            </div>

            <Link to={`/product/${products_id}`}>
               <div className='product-info-wrapper'>
                  <div className='product-name'>
                     <p>{products_name}</p>
                  </div>
                  <div className='product-description'>
                     <p>{products_description}</p>
                  </div>
                  <div className='product-stars'>
                     <FontAwesomeIcon icon="star" />
                     <p>{products_stars}</p>
                  </div>
                  <div className='product-price'>
                     <p>${products_price}</p>
                  </div>
               </div>
            </Link>
         </div>
      )
   }
}