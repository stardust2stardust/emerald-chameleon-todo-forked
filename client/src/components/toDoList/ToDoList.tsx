import type { Categories, Items } from '../../../types/data'
import './_ToDoList.scss'
import { useEffect, useRef } from 'react'

interface ListProps {
  selectedCategories: Categories[]
  selectedItems: Items[]
}

const ToDoList = (props: ListProps) => {
  const { selectedCategories, selectedItems } = props
  const ListItem = useRef<HTMLElement[]>([])

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
  }

  // Adds the initial event listeners to the items

  useEffect(() => {
    if (ListItem.current === null) return
    ListItem.current.map((item: HTMLElement) => {
      item.addEventListener('click', () => {
        HandleCrossOut(item)
      })
    })
  }, [ListItem])

  // Renders the list

  const Items = () => {
    const categoryElement = selectedCategories.map((category) => {
      const elements = selectedItems.map((item) => {
        if (item.categoryId !== category.id) return
        return (
          <div
            key={item.id}
            className="listItem"
            ref={(ref) => {
              if (ref === null) return
              ListItem.current.push(ref)
            }}
          >
            <h2 className="description">{item.description}</h2>
            <h2 className="dueDate">{item.dueDate}</h2>
          </div>
        )
      })
      return (
        <div className="category" key={category.id}>
          <h2 className="categoryName">{category.name}</h2>
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
