import React from 'react'
import { useState } from 'react'
import './_addCategory.scss'

type categoryObject = {
  id: number
  name: string
}

const AddCategory = () => {
  // state of Add Category button
  const [isClicked, setIsClicked] = useState(false)
  // const [categoryList, setCategoryList] = useState([])

  // 'https://todobackend20230309204702.azurewebsites.net/api/category' this is the endpoint for Categories.
  //navigating to https://todobackend20230309204702.azurewebsites.net/swagger/index.html will allow you to interrogate all the endpoints in the backend.
  const categoryUrl =
    'https://todobackend20230309204702.azurewebsites.net/api/categor'

  // isClicked state changes when clicking on Add Category, Ok, or Cancel buttons
  const handleClick = () => {
    console.log('you clicked a button')
    setIsClicked(!isClicked)
  }

  const getCategoryName = () => {
    // get value of text input
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement

    const categoryName: string = newCategoryInput.value
    return categoryName
  }

  const addNewCategory = async () => {
    const newCategoryName: string = getCategoryName()
    handleClick()
    try {
      const response = await fetch(categoryUrl)
      const categoryObjArray = await response.json()
      console.log(categoryObjArray)
      categoryObjArray.map((obj: categoryObject) => {
        console.log(obj.name)
        if (obj.name.toLowerCase() === newCategoryName.toLowerCase()) {
          console.log('that Category exists')
        }
      })
      if (!response.ok) {
        console.log('Could not get data')
        return
      }
    } catch (error) {
      console.log(error)
    }
    addCategoryToArray(newCategoryName)
  }

  const addCategoryToArray = (categoryName: string) => {
    console.log(categoryName)
  }
  // add Category (newCategoryInput.value) to existing List
  // <<<<<<<<<<<<<<<<<<<<<<<<<
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
 // >>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <div>
      {isClicked ? (
        <div className="new-category-input-wrapper">
          <input id="new-category-text" type="text" />
          <div className="new-category-input-buttons">
            <button
              id="okBtn"
              className="btn-ok"
              onClick={addNewCategory}
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
