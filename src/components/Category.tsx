import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../styles/Category.css"

type CategoryProps = {
  category: string,
  subCategory: string
}

function Category(props: CategoryProps) {
  return (
    <div className="category">
      <div className="iconParent">
      <FontAwesomeIcon icon={faBook} className="icon"/>
      </div>
      <div className="details">
        <span className="categoryTitle">{props.category}</span>
        <span>{props.subCategory}</span>
      </div>
    </div>
  )
}

export default Category