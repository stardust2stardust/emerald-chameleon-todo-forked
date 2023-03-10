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
  const [isExistingCategory, setIsExistingCategory] = useState(false)
  const [isOtherError, setIsOtherError] = useState(false)
  const [isEmptyInput, setIsEmptyInput] = useState(false)

  // text input

  // 'https://todobackend20230309204702.azurewebsites.net/api/category' this is the endpoint for Categories.
  //navigating to https://todobackend20230309204702.azurewebsites.net/swagger/index.html will allow you to interrogate all the endpoints in the backend.

  const categoryUrl =
    'https://todobackend20230309204702.azurewebsites.net/api/category'

  // isClicked state changes when clicking on Add Category, Ok, or Cancel buttons
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const handleCancelClick = () => {
    setIsExistingCategory(false)
    setIsOtherError(false)
    setIsClicked(!isClicked)
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement
    newCategoryInput.value = ''
  }

  const getCategoryName = () => {
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement
    const categoryName: string = newCategoryInput.value
    if (categoryName === '' || categoryName === undefined) {
      console.log('please enter a category name')
      setIsEmptyInput(true)
    } else {
      addNewCategory(categoryName)
    }
  }

  const addNewCategory = async (newCategoryName: string) => {
    try {
      const response = await fetch(categoryUrl)
      console.log(response)
      const categoryObjArray = await response.json()
      console.log(categoryObjArray)
      categoryObjArray.map((obj: categoryObject) => {
        if (obj.name.toLowerCase() === newCategoryName.toLowerCase()) {
          console.log('that Category exists already')
          setIsExistingCategory(true)
        } else {
          addCategoryToArray(newCategoryName)
        }
      })
      if (!response.ok) {
        console.log('Could not get data')
        setIsOtherError(true)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addCategoryToArray = async (categoryName: string) => {
    console.log(categoryName)
    const newCategory = {
      // catId: id,
      name: categoryName,
    }
    try {
      const response = await fetch(categoryUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        console.log('error in POST fetch')
        setIsOtherError(true)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

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
          <div className="error-message">
            {isExistingCategory && <p>That category already exists.</p>}
          </div>
          <div className="error-message">
            {isEmptyInput && <p>Please enter a category name.</p>}
          </div>
          <div className="error-message">
            {isOtherError && (
              <p>Uh oh! There is a connection issue to the server. :/</p>
            )}
          </div>
          <input id="new-category-text" type="text" />
          <div className="new-category-input-buttons">
            <button
              id="okBtn"
              className="btn-ok"
              onClick={getCategoryName}
              type="submit"
            >
              Ok
            </button>
            <button className="btn-cancel" onClick={handleCancelClick}>
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
