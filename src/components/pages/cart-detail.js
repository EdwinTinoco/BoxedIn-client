import React, { useState, useEffect, useContext } from "react";
import axios from "axios"

import CartItems from "../cart/cart-items"
import PaypalCheckoutButton from "../paypal/paypal-checkout-button"

import { UserContext } from '../../bootstrap'

export default function CartDetail(props) {
   const [cartItems, setCartItems] = useState([])
   const [userId, setUserId] = useState(props.match.params.slug)
   const [totalItems, setTotalItems] = useState(0)
   const [totalAmount, setTotalAmount] = useState(0)
   const [arrItemsOrder, setArrItemsOrder] = useState([])
   const [arrItemsOrderWithCartId, setArrItemsOrderWithCartId] = useState([])
   const [order, setOrder] = useState({})
   const { loggedInUser } = useContext(UserContext)

   // const order = {
   //    customer: "123456",
   //    total: "550.00",
   //    items: [
   //       {
   //          sku: '112',
   //          name: 'Camisa ReactJS',
   //          price: '300.00',
   //          quantity: 1,
   //          currency: "USD"
   //       },
   //       {
   //          sku: '99',
   //          name: 'Camisa JS',
   //          price: '125.00',
   //          quantity: 2,
   //          currency: "USD"
   //       }
   //    ]
   // }



   const handleIncrementItems = (quantityItems, cart_id, cart_products_price) => {
      let totalQuantityItems = 0

      if (quantityItems < 15) {
         totalQuantityItems = parseInt(quantityItems) + 1
         fetch(
            `https://ejt-boxedin-api.herokuapp.com/cart/${cart_id}`,
            {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  cart_quantity_items: totalQuantityItems
               })
            }
         ).then((res) => {
            setTotalItems(totalItems + 1)
            console.log("total amount antes", totalAmount)
            console.log("produc price", cart_products_price)
            let tempTotalAmount = parseFloat(totalAmount) + parseFloat(cart_products_price)
            console.log("total amount despues", tempTotalAmount)
            setTotalAmount(tempTotalAmount.toFixed(2))

            console.log(arrItemsOrderWithCartId)

            let newArrItemsOrder = arrItemsOrderWithCartId.map(item => {
               if (item.cart_id == cart_id)
                  return Object.assign({}, item, { quantity: totalQuantityItems })
               return item
            });

            setArrItemsOrderWithCartId(newArrItemsOrder)
            console.log("final", newArrItemsOrder)

            const finalNewArrItemsOrder = newArrItemsOrder.map(item => {
               const tempItems = {}

               tempItems.sku = item.sku
               tempItems.name = item.name
               tempItems.price = item.price
               tempItems.quantity = item.quantity
               tempItems.currency = "USD"

               return tempItems
            })

            setArrItemsOrder(finalNewArrItemsOrder)
            console.log("final final", finalNewArrItemsOrder)

            setOrder({
               customer: userId,
               total: tempTotalAmount,
               items: finalNewArrItemsOrder
            })
         }).catch(error => {
            console.log('handleIncrementItems error', error);
         })
      }
   }

   const handleDecrementItems = (quantityItems, cart_id, cart_products_price) => {
      let totalQuantityItems = 0

      if (quantityItems > 1) {
         totalQuantityItems = parseInt(quantityItems) - 1
         fetch(
            `https://ejt-boxedin-api.herokuapp.com/cart/${cart_id}`,
            {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  cart_quantity_items: totalQuantityItems
               })
            }
         ).then(res => {
            setTotalItems(totalItems - 1)
            console.log("total amount antes", totalAmount)
            let tempTotalAmount = parseFloat(totalAmount) - parseFloat(cart_products_price)
            console.log("total amount despues", tempTotalAmount)
            console.log("total amount despues with fixed", tempTotalAmount.toFixed(2))
            setTotalAmount(tempTotalAmount.toFixed(2))

            console.log(arrItemsOrderWithCartId)

            let newArrItemsOrder = arrItemsOrderWithCartId.map(item => {
               if (item.cart_id == cart_id)
                  return Object.assign({}, item, { quantity: totalQuantityItems })
               return item
            });

            setArrItemsOrderWithCartId(newArrItemsOrder)
            console.log("final", newArrItemsOrder)

            const finalNewArrItemsOrder = newArrItemsOrder.map(item => {
               const tempItems = {}

               tempItems.sku = item.sku
               tempItems.name = item.name
               tempItems.price = item.price
               tempItems.quantity = item.quantity
               tempItems.currency = "USD"

               return tempItems
            })

            setArrItemsOrder(finalNewArrItemsOrder)
            console.log("final final", finalNewArrItemsOrder)

            setOrder({
               customer: userId,
               total: tempTotalAmount,
               items: finalNewArrItemsOrder
            })
         }).catch(error => {
            console.log('handleDecrementItems error', error);
         })
      }
   }

   const handleDeleteItem = (cart_id, cart_products_price) => {
      fetch(`https://ejt-boxedin-api.herokuapp.com/delete-item-cart/${cart_id}`, {
         method: "DELETE"
      })
         .then(res => {
            setCartItems(
               cartItems.filter(item => {
                  return item.cart_id !== cart_id;
               })
            )

            let result = 0
            let tempTotalItems = 0
            let itemToDelete = 0
            for (var i = 0; i < arrItemsOrderWithCartId.length; i++) {
               if (arrItemsOrderWithCartId[i].cart_id === cart_id) {
                  result += arrItemsOrderWithCartId[i].price * arrItemsOrderWithCartId[i].quantity
                  tempTotalItems = totalItems - arrItemsOrderWithCartId[i].quantity
                  itemToDelete = i
               }
            }

            setTotalItems(tempTotalItems)

            let tempTotalAmount = parseFloat(totalAmount) - parseFloat(result)
            setTotalAmount(tempTotalAmount.toFixed(2))

            let newArrItemsOrder = arrItemsOrderWithCartId.slice()
            newArrItemsOrder.splice(itemToDelete, 1)
            setArrItemsOrderWithCartId(newArrItemsOrder)

            let finalNewArrItemsOrder = arrItemsOrder.slice()
            finalNewArrItemsOrder.splice(itemToDelete, 1)
            setArrItemsOrder(finalNewArrItemsOrder)

            setOrder({
               customer: userId,
               total: tempTotalAmount,
               items: finalNewArrItemsOrder
            })
         }).catch(error => {
            console.log('handleDeleteItem error', error);
         })
   }

   const generateOrder = (tempArrItemsOrderWithoutCartId) => {
      let result = 0
      for (var i = 0; i < tempArrItemsOrderWithoutCartId.length; i++) {
         result += tempArrItemsOrderWithoutCartId[i].price * tempArrItemsOrderWithoutCartId[i].quantity
      }

      setTotalAmount(parseFloat(result.toFixed(2)))

      setOrder({
         customer: userId,
         total: result,
         items: tempArrItemsOrderWithoutCartId
      })
   }

   const renderCartItemsByUser = () => {
      return cartItems.map(item => {
         return <CartItems
            key={item.cart_id}
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleIncrementItems={handleIncrementItems}
            handleDecrementItems={handleDecrementItems}
         />
      })
   }

   const getCartItemsByUser = () => {
      axios.get(`https://ejt-boxedin-api.herokuapp.com/carts-items-by-user/${userId}`)
         .then(response => {
            console.log("cart items", response.data)
            setCartItems(response.data)

            let result = 0
            for (var i = 0; i < response.data.length; i++) {
               result += response.data[i].cart_quantity_items
            }
            setTotalItems(result)

            const tempArrItemsOrderWithoutCartId = response.data.map(item => {
               const tempItems = {}

               tempItems.sku = item.cart_products_id
               tempItems.name = item.cart_products_name
               tempItems.price = item.cart_products_price
               tempItems.quantity = item.cart_quantity_items
               tempItems.currency = "USD"

               return tempItems
            })

            const tempArrItemsOrderWithCartId = response.data.map(item => {
               const tempItems = {}

               tempItems.cart_id = item.cart_id
               tempItems.sku = item.cart_products_id
               tempItems.name = item.cart_products_name
               tempItems.price = item.cart_products_price
               tempItems.quantity = item.cart_quantity_items
               tempItems.currency = "USD"

               return tempItems
            })

            setArrItemsOrder(tempArrItemsOrderWithoutCartId)
            setArrItemsOrderWithCartId(tempArrItemsOrderWithCartId)

            generateOrder(tempArrItemsOrderWithoutCartId)

         }).catch(error => {
            console.log('getCartItemsByUser error', error);
         })
   }

   useEffect(() => {
      getCartItemsByUser()
   }, [])

   return (
      <div className="cart-main-wrapper">
         <div className="title">
            <h1>Cart Items</h1>
         </div>

         {cartItems.length > 0 ? (
            <div className="checkout-wrapper">
               <div className="paypal-button">
                  <PaypalCheckoutButton order={order} />
               </div>
               <div className="total-detail">
                  <p>{`Items:      ${totalItems}`}</p>
                  <p>{`Total:     $${totalAmount} USD`}</p>
               </div>
            </div>)
            : null
         }

         {cartItems.length > 0 ?
            renderCartItemsByUser()
            : <h1>There's no items in the cart!</h1>
         }
      </div>
   )
}