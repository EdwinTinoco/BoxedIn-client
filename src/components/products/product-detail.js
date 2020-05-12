import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import Cookies from 'js-cookie'

import ProductComment from "./product-comment"
import Logo from '../../../static/assets/images/logo/Black-on-Transparent.png'

import AuthApi from '../authApi'

export default function ProductDetail(props) {
   const [userId, setUserId] = useState(Cookies.get("user"))
   const [userName, setUserName] = useState("")
   const [currentUser, setCurrentUser] = useState({})
   const [productItem, setProductItem] = useState({})
   const [productComments, setProductComments] = useState([])
   const [productId, setProductId] = useState(props.match.params.slug)
   const [comment, setComment] = useState("")
   const [addMessageCart, setAddMessageCart] = useState("")
   // const [commentsFormVisible, setCommentsFormVisible] = useState("none")

   const Auth = useContext(AuthApi)


   const handleShoppingCart = () => {
      let dateTimeToday = new Date()
      let month = dateTimeToday.getMonth()
      let day = dateTimeToday.getDate()
      let year = dateTimeToday.getFullYear()
      let hours = dateTimeToday.getHours()
      let min = dateTimeToday.getMinutes()
      let sec = dateTimeToday.getSeconds()
      let todayTime = `${month + 1}/${day}/${year}  ${hours}:${min}:${sec}`

      axios
         .post("https://ejt-boxedin-api.herokuapp.com/add-item-cart", {
            cart_products_id: parseInt(productId),
            cart_products_name: products_name,
            cart_products_image_url: products_image_url,
            cart_users_id: userId,
            cart_users_first_name: currentUser.users_first_name,
            cart_date: todayTime,
            cart_quantity_items: 1,
            cart_products_price: products_price
         })
         .then(res => {
            console.log(res)
            setAddMessageCart("The item was added to the Shopping Cart!")
         })
         .catch(err => console.log("handleShoppingCart Error: ", err))
   }

   const handleChange = (e) => {
      setComment(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      let dateTimeToday = new Date()
      let month = dateTimeToday.getMonth()
      let day = dateTimeToday.getDate()
      let year = dateTimeToday.getFullYear()
      let hours = dateTimeToday.getHours()
      let min = dateTimeToday.getMinutes()
      let sec = dateTimeToday.getSeconds()
      let todayTime = `${month + 1}/${day}/${year}  ${hours}:${min}:${sec}`

      if (comment !== "") {
         axios
            .post("https://ejt-boxedin-api.herokuapp.com/add-comment", {
               comments_comment: comment,
               comments_date: todayTime,
               comments_products_id: parseInt(productId),
               comments_users_id: 31,
               comments_users_id: userId
            })
            .then(res => {
               setComment("")
               setProductComments([res.data, ...productComments])
            })
            .catch(err => console.log("Comment handleSubmit Error: ", err))
      }
   }

   const getCurrentUser = () => {
      axios.get(`https://ejt-boxedin-api.herokuapp.com/user/${userId}`)
         .then(res => {
            setCurrentUser(res.data[0])
            // if (res.data[0].users_role === "admin") {
            //    setCommentsFormVisible("block")
            // } else if (res.data[0].users_role === "user") {
            //    setCommentsFormVisible("block")
            // }
         })
         .catch(err => {
            console.log("getCurrentUser error", err)
         })
   }

   const renderCommentsByProduct = () => {
      return productComments.map(comment => {
         return <ProductComment key={comment.comments_id} comment={comment} />
      })
   }

   const getProductItem = () => {
      axios.get(`https://ejt-boxedin-api.herokuapp.com/product/${productId}`)
         .then(response => {
            setProductItem(response.data[0])
         }).catch(error => {
            console.log('getProductItem error', error);
         })
   }

   const getCommenstByProducst = () => {
      axios.get(`https://ejt-boxedin-api.herokuapp.com/comments-by-product/${productId}`)
         .then(response => {
            setProductComments(response.data)
         }).catch(error => {
            console.log('getCommenstByProducst error', error);
         })
   }

   const setStyle = () => {
      if (currentUser.users_role === "admin") {
         return { display: "block" }
      } else if (currentUser.users_role === "user") {
         return { display: "block" }
      } else {
         return { display: "none" }
      }
   }

   useEffect(() => {
      getCurrentUser();
      getProductItem();
      getCommenstByProducst()
   }, [])

   const {
      products_id,
      products_name,
      products_description,
      products_inventory,
      products_image_url,
      products_categories,
      products_stars,
      products_price
   } = productItem

   console.log("product detail desde", Auth.user, currentUser)
   console.log(userId)
   return (

      <div className="product-detail-main-wrapper">
         <div className="product-detail-wrapper">
            <div className="image">
               <img src={products_image_url} />
            </div>
            <div className="details">
               <div className="name">
                  <h1>{products_name}</h1>
               </div>
               <div className="description">
                  <h3>{products_description}</h3>
               </div>
               <div className="stars">
                  <h3>Stars {products_stars}</h3>
               </div>
               <div className="price">
                  <h3>${products_price}</h3>
                  <h4>El precio no incluye taxes</h4>
               </div>
               <div className="add-button-cart">
                  <button type="button" onClick={handleShoppingCart}>Add to Cart</button>
                  <p>{addMessageCart}</p>
               </div>
            </div>
         </div>

         <div className="comments-form-wrapper">
            <form onSubmit={e => handleSubmit(e)} className="comments-form" style={setStyle()}>
               <h3>Add a comment</h3>
               <textarea
                  type="text"
                  placeholder="Comments"
                  name="comment"
                  onChange={e => handleChange(e)}
                  value={comment}
               />

               <div className="btn-comment">
                  <button type="submit">Add</button>
               </div>
            </form>
            <div className="sec-image">
               <img src={Logo} />
            </div>
         </div>

         <div className="comments-main-wrapper">
            <h4>Comments</h4>
            {renderCommentsByProduct()}
         </div>
      </div>
   )
}