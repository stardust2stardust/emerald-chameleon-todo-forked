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
        } 
        // Left this for Jeni to see, you can remove it after
        // This was creating creating more than one object which is why when you fetched the array it came up showing more than one
        /** else {
          addCategoryToArray(newCategoryName)
        } */
      })
      if (!response.ok) {
        console.log('Could not get data')
        setIsOtherError(true)
        return
      }
      // Should now create object only once
      // The 400+ old objects created are still going to show up so just have to ask mlancer to delete them
      addCategoryToArray(newCategoryName) // removed from categoryObjArray.map
    } catch (error) {
      console.log(error)
    }
  }

  const addCategoryToArray = async (categoryName: string) => {
    console.log(categoryName)
    const newCategory = {
      name: categoryName,
    }
    const categoryUrlWithQueryString = `${categoryUrl}?name=${categoryName}`
    try {
      const response = await fetch(categoryUrlWithQueryString, {
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
