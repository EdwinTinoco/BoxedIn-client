import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class CartItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         quantityItems: this.props.item.cart_quantity_items
      }
   }

   render() {
      const {
         cart_id,
         cart_products_id,
         cart_products_name,
         cart_products_image_url,
         cart_users_id,
         cart_users_first_name,
         cart_date,
         cart_quantity_items,
         cart_products_price
      } = this.props.item;

      return (
         <div className="cart-items-wrapper">
            <div className="cart-detail-wrapper">
               <div className="image">
                  <img src={cart_products_image_url} />
               </div>
               <div className="details">
                  <div className="name">
                     <h1>{cart_products_name}</h1>
                  </div>
                  <div className="price">
                     <h3>Price ${cart_products_price}</h3>
                  </div>
                  <div className="buttons-wrapper">
                     <div className="button-cart">
                        <button type="button" onClick={() => {
                           if (this.state.quantityItems < 10) {
                              this.setState({
                                 quantityItems: this.state.quantityItems + 1
                              })
                              this.props.handleIncrementItems(this.state.quantityItems, cart_id, cart_products_price)
                           }
                        }}>+</button>
                     </div>
                     <div className="quantity-items">
                        {this.state.quantityItems}
                     </div>
                     <div className="button-cart">
                        <button type="button" onClick={() => {
                           if (this.state.quantityItems > 1) {
                              this.setState({
                                 quantityItems: this.state.quantityItems - 1
                              })
                              this.props.handleDecrementItems(this.state.quantityItems, cart_id, cart_products_price)
                           }
                        }}>-</button>
                     </div>
                  </div>
                  <div className="remove-item">
                     <p onClick={() => this.props.handleDeleteItem(cart_id, cart_products_price)}>Remove Item</p>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}