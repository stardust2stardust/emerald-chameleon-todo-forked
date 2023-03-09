import React from 'react'
import { useState } from 'react'

// type Props = {}

// Clicking on the Add Category button should hide the button
// and display an input field with 2 buttons next to it: Ok and Cancel

const AddCategory = () => {
  //.. track state of Add Category button
  const [isClicked, setIsClicked] = useState(false)

  // if clicked, Add Category button is hidden and Input field with ok/cancel buttons is displayed

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
