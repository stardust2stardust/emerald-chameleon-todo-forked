import React from 'react'
import { useState } from 'react'
import '../css/_addCategory.scss'

const AddCategory = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [isExistingCategory, setIsExistingCategory] = useState(false)
  const [isOtherError, setIsOtherError] = useState(false)
  const [isEmptyInput, setIsEmptyInput] = useState(false)
  const [isAddedToList, setIsAddedToList] = useState(false)

  //navigating to https://todobackend20230309204702.azurewebsites.net/swagger/index.html will allow you to interrogate all the endpoints in the backend.

  const categoryUrl =
    'https://todobackend20230309204702.azurewebsites.net/api/category'

  // isClicked state changes when clicking on Add Category, Ok, or Cancel buttons
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const clearInput = () => {
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement
    newCategoryInput.value = ''
  }

  const handleCancelClick = () => {
    setIsExistingCategory(false)
    setIsOtherError(false)
    setIsClicked(!isClicked)
    clearInput()
  }

  const getCategoryName = () => {
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement
    const categoryName: string = newCategoryInput.value
    if (categoryName === '' || categoryName === undefined) {
      setIsEmptyInput(true)
      setIsAddedToList(false)
    } else {
      addCategoryToArray(categoryName)
    }
  }

  const addCategoryToArray = async (categoryName: string) => {
    const newCategory = {
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
      if (response.status === 409) { // duplicate category name error
        setIsExistingCategory(true)
        setIsEmptyInput(false)
      } else if (!response.ok) {  // any other error
        setIsOtherError(true)
      } else {
        setIsAddedToList(true)
        setIsExistingCategory(false)
        clearInput()
      }
    } catch (error) {
      console.log(error)
    }
  }

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
              <p>Uh oh! There is an issue connecting to the server.</p>
            )}
          </div>
          <div className="success-message">
            {isAddedToList && <p>Category added to list! </p>}
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
