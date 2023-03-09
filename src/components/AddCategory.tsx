import React from 'react'
import { useState } from 'react'

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
      {isClicked && (
        <>
          <input type="text" />
          <button onClick={handleClick} type="submit">
            Ok
          </button>
          <button onClick={handleClick}>Cancel</button>
        </>
      )}
      {!isClicked && <button onClick={handleClick}>Add Category</button>}
    </div>
  )
}

export default AddCategory
