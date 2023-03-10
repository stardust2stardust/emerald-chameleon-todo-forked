import React from 'react'
import { useState, useEffect } from 'react'
import './_addCategory.scss'

// type Props = {}

const AddCategory = () => {
  // state of Add Category button
  const [isClicked, setIsClicked] = useState(false)
  const [categoryList, setCategoryList] = useState([])

  // isClicked state changes when clicking on Add Category, Ok, or Cancel buttons
  const handleClick = () => {
    console.log('you clicked a button')
    setIsClicked(!isClicked)
  }

  const addToCategoryList = () => {
        ///Travis Comments>>>
    ///So we should be able to rely on our backend/database to ensure data integrity, 
    ///which means we can be confident that if we make a POST operation with duplicate data
    ///the http request will return an error response for us to handle, ideally with a nice error message
    ///for us to handle in the case of a data validation error.

    //ex: (feel free to use any httprequest handler, there may be one preferred for use with React, idk)
    
    // const todoCategoryUrl = 'http://https://todobackend20230309204702.azurewebsites.net/api/ToDoCategories/api/ToDoCategories'
    // const newCategoryPayload = {
    // Name: name
    //};
    // axios.post(todoCategoryUrl, newCategoryPayload)
    //   .then() - handle what you want to do here (updating the display)
    //   .catch(error) - the category was not written to the db, handle what to do in that case here 
    // !!There could be many reasons the HTTP request fails, "bonus points" if you display a message to the user the category already exists 
    // and a generic error message for any other error (like the backend service being down, backend has no connection to db, etc...). 
    // "Exception handling is the difference between good programmers and *exceptional* programmers".
    console.log('you clicked Ok')
    handleClick()

    // get value of text input
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement

    const categoryToAdd: string = newCategoryInput.value

    // fetch Category List
    
    async function fetchCategoryList() {
      const response = await fetch('https://todobackend20230309204702.azurewebsites.net/api/ToDoCategories') //this is the endpoint for Categories. 
      //navigating to https://todobackend20230309204702.azurewebsites.net/swagger/index.html will allow you to interrogate all the endpoints in the backend.
      const data = await response.json()
      console.log(data)
      return data
    }
    fetchCategoryList()

    // add Category (newCategoryInput.value) to existing List
  }

  return (
    <div>
      {isClicked ? (
        <div className="new-category-input-wrapper">
          <input id="new-category-text" type="text" />
          <div className="new-category-input-buttons">
            <button
              id="okBtn"
              className="btn-ok"
              onClick={addToCategoryList}
              type="submit"
            >
              Ok
            </button>
            <button className="btn-cancel" onClick={handleClick}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="new-category-input-wrapper">
          <button className="btn-add-category" onClick={handleClick}>
            Add Category
          </button>
        </div>
      )}
    </div>
  )
}

export default AddCategory
