import type { Categories, Items } from '../../../types/data'
import './_ToDoList.scss'
import { useEffect, useRef } from 'react'

import PostToDoStatus from '../../functions/PostToDoStatus'

interface ListProps {
  selectedCategories: Categories[]
  items: Items[]
}

const ToDoList = (props: ListProps) => {
  const { selectedCategories, items } = props
  const ListItem = useRef<HTMLElement[]>([])

  const UpdateStatus = async (element: HTMLElement) => {
    const item = items.find((item) => {
      const elementKey = element.getAttribute('id')
      if (elementKey === null) return
      return item.id.toString() === elementKey
    })
    if (item === undefined) return
    await PostToDoStatus(item)
  }

  // Handles crossing out the item when clicked

  const HandleCrossOut = (item: HTMLElement) => {
    item.setAttribute('class', 'listItemClicked')
    item.removeEventListener('click', () => {
      HandleCrossOut(item)
    })
    //setTimeout prevents double clicks on accident
    setTimeout(() => {
      item.addEventListener('click', () => {
        HandleUndo(item)
      })
    }, 250)

    UpdateStatus(item)
  }

  // Handles un-crossing out the item when clicked

  const HandleUndo = (item: HTMLElement) => {
    item.setAttribute('class', 'listItemAfter')
    item.removeEventListener('click', () => {
      HandleUndo(item)
    })
    //setTimeout prevents double clicks on accident
    setTimeout(() => {
      item.addEventListener('click', () => {
        HandleCrossOut(item)
      })
    }, 250)

    UpdateStatus(item)
  }

  // Adds the initial event listeners to the items

  useEffect(() => {
    if (ListItem.current.length === 0) return
    ListItem.current.map((item: HTMLElement) => {
      item.addEventListener('click', () => {
        if (item.getAttribute('class') === 'listItemClicked') {
          HandleUndo(item)
          return
        } else {
          HandleCrossOut(item)
        }
      })
    })
  }, [selectedCategories])

  // Renders the list

  const DateFormatter = (date: string) => {
    const test = date.split('T')[0].split('-')
    return `${test[1]}/${test[2]}/${test[0]}`
  }

  const Items = () => {
    const categoryElement = selectedCategories.map((category) => {
      const elements = items.map((item) => {
        if (item.categoryId !== category.id) return
        if (item.isDone) {
          return (
            <div
              key={item.id}
              id={item.id.toString()}
              className="listItemClicked"
              ref={(ref) => {
                if (ref === null) return
                ListItem.current.push(ref)
              }}
            >
              <h2 className="description">{item.description}</h2>
              <h2 className="dueDate">{DateFormatter(item.dueDate)}</h2>
            </div>
          )
        } else {
          return (
            <div
              key={item.description}
              className="listItem"
              id={item.id.toString()}
              ref={(ref) => {
                if (ref === null) return
                ListItem.current.push(ref)
              }}
            >
              <h2 className="description">{item.description}</h2>
              <h2 className="dueDate">{DateFormatter(item.dueDate)}</h2>
            </div>
          )
        }
      })
      return (
        <div className="category" key={category.id}>
          <h2 className="categoryName">{category.name}</h2>
          <div className="categoryHeaders">
            <h3 className="categorySubHeader">Task Name</h3>
            <h3 className="categorySubHeader">Due Date</h3>
          </div>
          {elements}
        </div>
      )
    })
    return <div className="list">{categoryElement}</div>
  }

  return (
    <div className="listWrapper">
      <Items />
    </div>
  )
}

export default ToDoList
