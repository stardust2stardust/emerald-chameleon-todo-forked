import { useState, useEffect } from 'react'

export default function Sidebar() {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err))
  }, [])

  console.log(categories)

  return (
    <ul className="sidebar">
      <li className="category">All</li>
      {categories.map((cat, i) => {
        if (i < 10) return <li className="category">{cat}</li>
      })}
    </ul>
  )
}
