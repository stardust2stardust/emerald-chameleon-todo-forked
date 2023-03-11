import React from 'react'
import { useState } from 'react'
import './_addCategory.scss'

type categoryObject = {
  id: number
  name: string
}

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
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement
    clearInput()
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
      addCategoryToArray(categoryName)
    }
  }

  // const addNewCategory = async (newCategoryName: string) => {
  //   try {
  //     const response = await fetch(categoryUrl)
  //     const categoryObjArray = await response.json()
  //     // check
  //     categoryObjArray.map((obj: categoryObject) => {
  //       if (obj.name.toLowerCase() === newCategoryName.toLowerCase()) {
  //         console.log('that Category exists already')
  //         setIsExistingCategory(true)
  //       }
  //     })

  //     addCategoryToArray(newCategoryName)
  //   } catch (error) {
  //     console.log('catch error: ', error)
  //   }
  // }

  const addCategoryToArray = async (categoryName: string) => {
    console.log(categoryName)
    const newCategory = {
      name: categoryName,
    }
    const categoryUrlWithQueryString = `${categoryUrl}`
    try {
      const response = await fetch(categoryUrlWithQueryString, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })
      if (response.status === 409) {
        setIsExistingCategory(true)
        setIsEmptyInput(false)
      } else if (!response.ok) {
        console.log('other error')
        setIsOtherError(true)
      } else {
        console.log('New Category Added')
        setIsAddedToList(true)
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
              <p>Uh oh! There is a connection issue to the server. :/</p>
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
