import { useState, useEffect, useRef } from 'react'
import { Categories } from '../../types/data'
import './_sidebar.scss'

const dbstring = 'https://todobackend20230309204702.azurewebsites.net/api/category'
// const dbstring = 'https://dummyjson.com/products/categories'

type SidebarProps = {
  selectedCats: string[]
  setSelectedCats: (val: string[]) => void
}

export default function Sidebar({ selectedCats, setSelectedCats }: SidebarProps) {
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
    console.log(selectedCats)
  }, [selectedCats])

  function filterCategories(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    if (target.id === 'category-all') {
      setSelectedCats(categories.map((cat) => cat.name))
      target.classList.add('active')
    } else if (selectedCats.includes(target.id)) {
      setSelectedCats(selectedCats.filter((cat) => cat !== target.id))
      allButtonRef.current?.classList.remove('active')
    } else {
      setSelectedCats([...selectedCats, target.id])
      allButtonRef.current?.classList.remove('active')
    }
  }

  return (
    <ul className="sidebar">
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
                selectedCats.includes(cat.name) ? 'active' : ''
              }`}
              onClick={filterCategories}
              id={cat.name}
            >
              {cat.name}
            </button>
          )
      })}
    </ul>
  )
}
