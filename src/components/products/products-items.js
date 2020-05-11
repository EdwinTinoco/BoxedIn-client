import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
               {products_categories}
            </div>

            <div className='product-image'>
               <img src={products_image_url} alt='Product display' />
            </div>
            <Link to={`/product/${products_id}`}>
               <div className='product-info-wrapper'>
                  <p>{products_name}</p>

                  {products_description}
                  {products_stars}
                  ${products_price}
                  {/* <div className='product-name'>
                     <h4>{products_name}</h4>
                  </div>
                  <div className='product-description'>
                     <h4>{products_description}</h4>
                  </div>
                  <div className='product-price'>
                     <h4>${products_price}</h4>
                  </div> */}
               </div>
            </Link>
         </div>


      )
   }
}