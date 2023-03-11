import { useState, useEffect, useRef } from 'react'
import { Categories } from '../../types/data'
import './_sidebar.scss'

const dbstring = 'https://todobackend20230309204702.azurewebsites.net/api/category'
// const dbstring = 'https://dummyjson.com/products/categories'

type SidebarProps = {
  selectedCategories: string[]
  setSelectedCategories: (value: string[]) => void
}

export default function Sidebar({
  selectedCategories,
  setSelectedCategories,
}: SidebarProps) {
  const [categories, setCategories] = useState<Categories[]>([])
  const allButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    fetch(dbstring)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log(selectedCategories)
  }, [selectedCategories])

  function filterCategories(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    if (target.id === 'category-all') {
      setSelectedCategories(categories.map((cat) => cat.name))
      target.classList.add('active')
    } else if (selectedCategories.includes(target.id)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== target.id))
      allButtonRef.current?.classList.remove('active')
    } else {
      setSelectedCategories([...selectedCategories, target.id])
      allButtonRef.current?.classList.remove('active')
    }
  }

  return (
    <nav className="sidebar">
      <h2>Categories</h2>
      <button
        className="category"
        id="category-all"
        onClick={filterCategories}
        ref={allButtonRef}
      >
        All
      </button>
      {categories.map((cat, i) => {
        if (i < 10)
          return (
            <button
              key={cat.name}
              className={`category ${
                selectedCategories.includes(cat.name) ? 'active' : ''
              }`}
              onClick={filterCategories}
              id={cat.name}
            >
              {cat.name}
            </button>
          )
      })}
    </nav>
  )
}
