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
    console.log('you clicked Ok')
    handleClick()

    // get value of text input
    const newCategoryInput = document.getElementById(
      'new-category-text'
    ) as HTMLInputElement

    const categoryToAdd: string = newCategoryInput.value

    // fetch Category List
    async function fetchCategoryList() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users') // test api
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
