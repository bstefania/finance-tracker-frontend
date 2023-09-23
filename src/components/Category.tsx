import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../styles/Category.scss"

type CategoryProps = {
  category: string,
  color: string,
  categoryGroup: string
}

function Category({category, color, categoryGroup}: CategoryProps) {
  return (
    <div className="category">
      <div className="iconParent circle" style={{backgroundColor: color}}>
        <div className="iconBackground circle">
          <FontAwesomeIcon icon={faMoneyBill} className="icon"/>
        </div>
      </div>
      <div className="details">
        <span className="categoryTitle">{categoryGroup}</span>
        <span>{category}</span>
      </div>
    </div>
  )
}

export default Category