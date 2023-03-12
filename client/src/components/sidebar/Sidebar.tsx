import { useState, useEffect, useRef } from 'react'
import { Categories } from '../../../types/data'
import '../css/_sidebar.scss'
import AddCategory from '../addCategory/AddCategory'

// const dbstring = 'https://dummyjson.com/products/categories'

type SidebarProps = {
  selectedCategories: Categories[]
  setSelectedCategories: (value: Categories[]) => void
  categories: Categories[]
}

export default function Sidebar(props: SidebarProps) {
  const { selectedCategories, setSelectedCategories, categories } = props
  const allButtonRef = useRef<HTMLButtonElement>(null)

  function addActiveClass(target: HTMLElement) {
    target.classList.add('active')
  }

  function removeActiveClass(target: HTMLElement) {
    target.classList.remove('active')
  }

  function filterCategories(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    if (target.classList.contains('active')) {
      removeActiveClass(target)
      const newCategories = selectedCategories.filter(
        (cat) => cat.name !== target.id
      )
      setSelectedCategories(newCategories)
    } else {
      addActiveClass(target)
      const newCategories = selectedCategories.concat(
        categories.filter((cat) => cat.name === target.id)
      )
      setSelectedCategories(newCategories)
    }
  }

  const HandleAllFilter = () => {
    const allButtons = document.querySelectorAll('.category-sidebar')
    if (selectedCategories.length === categories.length) {
      allButtons.forEach((button) => removeActiveClass(button as HTMLElement))
      setSelectedCategories([])
    } else {
      allButtons.forEach((button) => addActiveClass(button as HTMLElement))
      setSelectedCategories(categories)
    }
  }

  return (
    <nav className="sidebar">
      <h2>Categories</h2>
      <div className="category-list">
        <button
          className="category-sidebar"
          id="category-all"
          onClick={HandleAllFilter}
          ref={allButtonRef}
        >
          All
        </button>
        {categories.map((cat, i) => {
          if (i < 10)
            return (
              <button
                key={cat.name}
                className={`category-sidebar ${
                  selectedCategories.includes(cat) ? 'active' : ''
                }`}
                onClick={filterCategories}
                id={cat.name}
              >
                {cat.name}
              </button>
            )
        })}
      </div>
      <AddCategory />
    </nav>
  )
}
