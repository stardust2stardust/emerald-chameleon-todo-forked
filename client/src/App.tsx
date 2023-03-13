import { useState } from 'react'
import './App.scss'
import type { Categories, Items } from '../types/data'
import './components/sidebar/Sidebar'

import AddCategory from './components/addCategory/AddCategory'
import ToDoList from './components/toDoList/ToDoList'
import Sidebar from './components/sidebar/Sidebar'

import { useEffect } from 'react'
const url = 'https://todobackend20230309204702.azurewebsites.net/api/'

//Test Data
const test: Items[] = [
  {
    id: 0,
    description: 'firstItem',
    dueDate: 'Never',
    priority: 1,
    isDone: false,
    categoryId: 0,
  },
  {
    id: 1,
    description: 'secondItem',
    dueDate: 'Never',
    priority: 0,
    isDone: false,
    categoryId: 0,
  },
  {
    id: 2,
    description: 'thirdItem',
    dueDate: 'Never',
    priority: 0,
    isDone: false,
    categoryId: 1,
  },
]
const cats: Categories[] = [
  {
    id: 0,
    name: 'Home',
  },
  {
    id: 1,
    name: 'Work',
  },
]

function App() {
  const [selectedCategories, setSelectedCategories] = useState<Categories[]>([])
  const [categories, setCategories] = useState<Categories[]>([])
  const [items, setItems] = useState<Items[]>([])

  useEffect(() => {
    fetch(url + 'category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    fetch(url + 'item')
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={'main'}>
      <div className={'header'}>
        <h1>Emerald Chameleons Forked</h1>
        <h2>To Do App</h2>
      </div>
      <div className={'content'}>
        <Sidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories}
        />
        <div className={'counter'}>
          <ToDoList selectedCategories={selectedCategories} items={items} />
        </div>
        {/* <div className={'add-category-wrapper'}>
          <AddCategory />
        </div> */}
        <div className={'to-do-wrapper'}></div>
      </div>
    </div>
  )
}

export default App
