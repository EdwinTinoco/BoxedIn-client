import React from "react"
import ReactDOM from "react-dom"
import paypal from "paypal-checkout"

const PaypalCheckoutButton = ({ order }) => {
   const paypalConf = {
      currency: "USD",
      env: "sandbox",
      client: {
         sandbox: "AaRqhQqFfzShXNicktIyV1OcZ65Uq1PvzKo-_Ahr-ECu9IqpayW6zGEl7hads9xMK2x8VKPZuRSggL0C",
         production: "EOGbgc5h2Z7WSBQxq2INXcfTwRZlIEnUbc_vrkqEoApoOXodwKiCP0cJtzUaKAuybJeUuckn5RCGWYUi"
      },
      style: {
         label: "pay",
         size: "medium",
         shape: "rect",
         color: "gold"
      }
   }

   const PayPalButton = paypal.Button.driver("react", { React, ReactDOM })

   const payment = (data, actions) => {
      const payment = {
         transactions: [
            {
               amount: {
                  total: order.total,
                  currency: paypalConf.currency
               },
               description: "Buy in BoxedIn APP Website",
               custom: order.customer || "",
               item_list: {
                  items: order.items
               }
            }
         ],
         note_to_payer: "Give us a call for any questions!"
      }

      return actions.payment.create({ payment })
   }

   const onAuthorize = (data, actions) => {
      return actions.payment.execute()
         .then(response => {
            console.log(response);
            alert(`Payment processed successfully, ID: ${response.id}`)
         })
         .catch(error => {
            console.log(error);
            alert("Error ocurred when it processed the payment with PayPal")
         })
   }

   const onError = (error) => {
      console.log(error)
      alert("Payment wasnt processed, try again")
   }

   const onCancel = (data, actions) => {
      alert("Payment wasnt processed, the customer canceled the process")
   }

   return (
      <PayPalButton
         env={paypalConf.env}
         client={paypalConf.client}
         payment={(data, actions) => payment(data, actions)}
         onAuthorize={(data, actions) => onAuthorize(data, actions)}
         onCancel={(data, actions) => onCancel(data, actions)}
         onError={(error) => onError(error)}
         style={paypalConf.style}
         commit
      // locale="us"
      />
   )
}

export default PaypalCheckoutButton;