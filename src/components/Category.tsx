import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../styles/Category.scss"

type CategoryProps = {
  category: string,
  categoryGroup: string
}

function Category(props: CategoryProps) {
  return (
    <div className="category">
      <div className="iconParent">
      <FontAwesomeIcon icon={faMoneyBill} className="icon"/>
      </div>
      <div className="details">
        <span className="categoryTitle">{props.categoryGroup}</span>
        <span>{props.category}</span>
      </div>
    </div>
  )
}

export default Category