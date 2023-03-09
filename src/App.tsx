import { useState } from 'react'
import './App.scss'

import AddCategory from './components/addCategory/AddCategory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={'main'}>
      <div className={'header'}>
        <h1>Emerald Chameleons</h1>
      </div>
      <div className={'content'}>
        <div className={'counter'}>
          <h2>To Do</h2>
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
