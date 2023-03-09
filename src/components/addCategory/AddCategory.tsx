import React from 'react'
import { useState } from 'react'
import './_addCategory.scss'

// type Props = {}

const AddCategory = () => {
  // state of Add Category button
  const [isClicked, setIsClicked] = useState(false)

  // isClicked state changes when clicking on Add Category, Ok, or Cancel buttons
  const handleClick = () => {
    console.log('you clicked a button')
    setIsClicked(!isClicked)
  }

  const addToCategoryList = () => {
    console.log('you clicked Ok')
    handleClick()

    // fetch Category List

    // check that Category does not exist

    // add Category to exising List

    // display new Category in UI
  }

  return (
    <div>
      {isClicked ? (
        <div className="new-category-input-wrapper">
          <input id="new-category-text" type="text" />
          <div className="new-category-input-buttons">
            <button className="btn-ok" onClick={addToCategoryList} type="submit">
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
