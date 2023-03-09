import React from 'react'
import { useState } from 'react'
import './_addCategory.scss'

// type Props = {}

const AddCategory = () => {
  // state of Add Category button
  const [isClicked, setIsClicked] = useState(false)

  // isClicked state changes when clicking on Add Category, Ok, or Cancel buttons
  const handleClick = () => {
    console.log('testing Add New')
    setIsClicked(!isClicked)
  }

  return (
    <div>
      {isClicked ? (
        <div className="new-category-input-wrapper">
          <input id="new-category-text" type="text" />
          <div className="new-category-input-buttons">
            <button className="btn-ok" onClick={handleClick} type="submit">
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
