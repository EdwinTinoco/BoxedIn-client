import React, { Component } from "react"
import axios from "axios"

import ProductsItem from "../products/products-items"

export default class Products extends Component {
   constructor(props) {
      super(props)

      this.state = {
         products: []
      }
   }

   getProductsItems() {
      axios.get("https://ejt-boxedin-api.herokuapp.com/products")
         .then(response => {
            this.setState({
               products: response.data
            })
         })
         .catch(error => {
            console.log("getProducts error: ", error);
         })
   }

   productsItems() {
      return this.state.products.map(item => {
         return (
            <ProductsItem key={item.products_id} item={item} />
         )
      })
   }

   componentDidMount() {
      this.getProductsItems()
   }

   render() {
      return (
         <div className="products-main-wrapper">
            <div className="search-bar">
               <h3>Search bar</h3>
            </div>
            <div className="products-items-wrapper">
               {this.productsItems()}
            </div>
         </div>
      )
   }
}