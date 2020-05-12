import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import Cookies from 'js-cookie'


export default function Dashboard(props) {
   const [productId, setProductId] = useState()
   const [currentProduct, setCurrentProduct] = useState({})

   const [addMode, setAddMode] = useState(true)
   const [editMode, setEditMode] = useState(false)
   const [deleteMode, setDeleteMode] = useState(false)

   const [addEditTitle, setAddEditTitle] = useState("Add New Product")
   const [message, setMessage] = useState("")

   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [inventory, setInventory] = useState()
   const [imageUrl, setImageUrl] = useState('')
   const [category, setCategory] = useState("Fitness")
   const [stars, setStars] = useState()
   const [price, setPrice] = useState()

   const [userFirstName, setUserFirstName] = useState('')
   const [userLastName, setUserLastName] = useState('')
   const [userEmail, setUserEmail] = useState('')
   const [userAddress, setUserAddress] = useState("")
   const [userZipCode, setUserZipCode] = useState('')
   const [userPassword, setUserPassword] = useState("")
   const [userRole, setUserRole] = useState("user")


   const handleAddModeProduct = () => {
      setEditMode(false)
      setDeleteMode(false)
      setAddMode(true)
      setProductId("")
      setMessage("")
      setAddEditTitle("Add New Product")
   }

   const handleEditModeProduct = () => {
      setAddMode(false)
      setDeleteMode(false)
      setEditMode(true)
      setProductId("")
      setMessage("")
      setAddEditTitle("Edit Product")
   }

   const handleDeleteModeProduct = () => {
      setAddMode(false)
      setEditMode(false)
      setDeleteMode(true)
      setProductId("")
      setMessage("")
      setAddEditTitle("Delete Product")
   }

   const handleSubmitNewProduct = () => {
      event.preventDefault();

      if (addMode && !editMode && !deleteMode) {
         let tempImageUrl = ""
         if (imageUrl === "") {
            tempImageUrl = 'https://source.unsplash.com/random'
         } else {
            tempImageUrl = imageUrl
         }

         axios
            .post(
               'https://ejt-boxedin-api.herokuapp.com/add-product',
               {
                  products_name: name,
                  products_description: description,
                  products_inventory: inventory,
                  products_image_url: tempImageUrl,
                  products_categories: category,
                  products_stars: stars,
                  products_price: price
               },
            )
            .then(response => {
               setMessage("Product Added Successfully!")
               setName('')
               setDescription('')
               setInventory("")
               setImageUrl("")
               setCategory("")
               setStars("")
               setPrice("")
            })
            .catch(error => {
               console.log('handleSubmitNewProduct error', error)
            })

      } else if (editMode && !addMode && !deleteMode) {
         let tempImageUrl = ""
         if (imageUrl === "") {
            tempImageUrl = 'https://source.unsplash.com/random'
         } else {
            tempImageUrl = imageUrl
         }

         axios
            .put(
               `https://ejt-boxedin-api.herokuapp.com/product/${productId}`,
               {
                  products_name: name,
                  products_description: description,
                  products_inventory: inventory,
                  products_image_url: tempImageUrl,
                  products_categories: category,
                  products_stars: stars,
                  products_price: price
               },
            )
            .then(response => {
               setMessage("Product Updated Successfully!")
               setName('')
               setDescription('')
               setInventory("")
               setImageUrl("")
               setCategory("")
               setStars("")
               setPrice("")
               setProductId("")
            })
            .catch(error => {
               console.log('handleSubmitNewProduct error', error)
            })
      }
   }

   const handleSubmitNewUser = () => {
      event.preventDefault();

      axios
         .post(
            'https://ejt-boxedin-api.herokuapp.com/add-user',
            {
               users_first_name: userFirstName,
               users_last_name: userLastName,
               users_email: userEmail,
               users_address: userAddress,
               users_zip_code: userZipCode,
               users_password: userPassword,
               users_role: userRole
            },
         )
         .then(response => {
            setUserFirstName('')
            setUserLastName('')
            setUserEmail('')
            setUserAddress('')
            setUserZipCode('')
            setUserPassword('')
            setUserRole('')
            setMessage("User Added Succesfully!")
         })
         .catch(error => {
            console.log('handleSubmitNewUser error', error)
         })
   }

   const handleDeleteProduct = () => {
      console.log(productId)
      axios
         .delete(`https://ejt-boxedin-api.herokuapp.com/delete-product/${productId}`)
         .then(res => {
            setMessage("Product Deleted Succesfully")
            setProductId("")
         })
         .catch(err => {
            console.log("handleDeleteProduct error", err)
         })
   }

   const getProductById = () => {
      axios
         .get(`https://ejt-boxedin-api.herokuapp.com/product/${productId}`)
         .then(res => {
            setName(res.data[0].products_name)
            setDescription(res.data[0].products_description)
            setInventory(res.data[0].products_inventory)
            setImageUrl(res.data[0].products_image_url)
            setCategory(res.data[0].products_categories)
            setStars(res.data[0].products_stars)
            setPrice(res.data[0].products_price)
            setCurrentProduct(res.data[0])
         })
         .catch(err => {
            console.log("getProductById error", err)
         })
   }

   const styleDisplay = () => {
      if (editMode || deleteMode) {
         return { display: "block" }
      } else {
         return { display: "none" }
      }
   }

   return (
      <div className="dashboard-main-wrapper">
         <div className="add-form-wrapper">
            <div className="add-edit-wrapper">
               <div className="add-edit-buttons">
                  <button onClick={handleAddModeProduct}>Add</button>
                  <button onClick={handleEditModeProduct}>Edit</button>
                  <button onClick={handleDeleteModeProduct}>Delete</button>
               </div>
               <div className="title-add-edit">
                  <h1>{addEditTitle}</h1>
               </div>
            </div>
            <div className="product-id-search" style={styleDisplay()}>
               <input type="text"
                  value={productId}
                  onChange={({ target }) => { setProductId(target.value) }}
                  placeholder="Enter a product ID" />
               <button onClick={
                  (editMode && !addMode && !deleteMode) ?
                     getProductById
                     :
                     (deleteMode && !addMode && !editMode) ?
                        handleDeleteProduct
                        : null

               }>Search</button>
            </div>
            <form onSubmit={handleSubmitNewProduct} className="add-forms">
               <input type='text'
                  value={name}
                  onChange={({ target }) => { setName(target.value) }}
                  className='new-entry-input'
                  placeholder='Enter Product Name'>
               </input>

               <input type='text'
                  value={description}
                  onChange={({ target }) => { setDescription(target.value) }}
                  className='new-entry-input'
                  placeholder='Enter Product Description'>
               </input>

               <input type='text'
                  className='new-entry-input'
                  value={inventory}
                  onChange={({ target }) => { setInventory(target.value) }}
                  placeholder='Enter Current Inventory'>
               </input>

               <input type='text'
                  className='new-entry-input'
                  value={imageUrl}
                  onChange={({ target }) => { setImageUrl(target.value) }}
                  placeholder='Enter Product Image URL'>
               </input>

               <select className='new-entry-input new-entry-select'
                  value={category}
                  onChange={({ target }) => { setCategory(target.value) }}>
                  <option value='Fitness'>Fitness</option>
                  <option value='Yoga'>Yoga</option>
                  <option value='Babys'>Babys</option>
                  <option value='Pregnancy'>Pregnancy</option>
                  <option value='Autos'>Autos</option>
                  <option value='Motorcycles'>Motorcycles</option>
               </select>

               <input type='text'
                  className='new-entry-input'
                  value={stars}
                  onChange={({ target }) => { setStars(target.value) }}
                  placeholder='Enter Product Stars'>
               </input>

               <input type='text'
                  className='new-entry-input'
                  value={price}
                  onChange={({ target }) => { setPrice(target.value) }}
                  placeholder='Enter Product Price'>
               </input>

               {message}

               <button type='submit' className='add-button'>Submit</button>

            </form>
         </div>

         <div className="add-form-wrapper">
            <h1>Add new User</h1>
            <form onSubmit={handleSubmitNewUser} className="add-forms">
               <input type='text'
                  value={userFirstName}
                  onChange={({ target }) => { setUserFirstName(target.value) }}
                  className='new-entry-input'
                  placeholder='Enter User First Name'>
               </input>

               <input type='text'
                  value={userLastName}
                  onChange={({ target }) => { setUserLastName(target.value) }}
                  className='new-entry-input'
                  placeholder='Enter User Last Name'>
               </input>

               <input type='email'
                  className='new-entry-input'
                  value={userEmail}
                  onChange={({ target }) => { setUserEmail(target.value) }}
                  placeholder='Enter User Email'>
               </input>

               <input type='text'
                  className='new-entry-input'
                  value={userAddress}
                  onChange={({ target }) => { setUserAddress(target.value) }}
                  placeholder='Enter User Address'>
               </input>

               <input type='text'
                  className='new-entry-input'
                  value={userZipCode}
                  onChange={({ target }) => { setUserZipCode(target.value) }}
                  placeholder='Enter User Zip Code'>
               </input>

               <input type='password'
                  className='new-entry-input'
                  value={userPassword}
                  onChange={({ target }) => { setUserPassword(target.value) }}
                  placeholder='Enter User Password'>
               </input>

               <select className='new-entry-input new-entry-select'
                  value={userRole}
                  onChange={({ target }) => { setUserRole(target.value) }}>
                  <option value='admin'>admin</option>
                  <option value='user'>user</option>
               </select>

               {message}

               <button type='submit' className='add-button'>Submit</button>
            </form>

         </div>
      </div>
   )
}