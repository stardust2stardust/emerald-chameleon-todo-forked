import { useState } from 'react'
import './App.scss'
import type { Categories, Items } from '../types/data'
import AddCategory from './components/addCategory/AddCategory'
import ToDoList from './components/toDoList/ToDoList'

function App() {
  const [count, setCount] = useState(0)
  const test: Items[] = [
    {
      id: 0,
      description: 'firstItem',
      dueDate: 'Never',
      priority: 'Worst',
      isDone: false,
      categoryId: 0,
    },
    {
      id: 1,
      description: 'secondItem',
      dueDate: 'Never',
      priority: 'Worst',
      isDone: false,
      categoryId: 0,
    },
    {
      id: 2,
      description: 'thirdItem',
      dueDate: 'Never',
      priority: 'Worst',
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

  return (
    <div className={'main'}>
      <div className={'header'}>
        <h1>Emerald Chameleons</h1>
      </div>
      <div className={'content'}>
        <div className={'counter'}>
          <ToDoList selectedCategories={cats} selectedItems={test} />
        </div>
        <div className={'add-category-wrapper'}>
          <AddCategory />
        </div>
        <div className={'to-do-wrapper'}></div>
      </div>
    </div>
  )
}

export default App
