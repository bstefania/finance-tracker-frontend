import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"

type MoneyCardProps = {
  title: string
  percentage: string
  amount: string
  icon: IconDefinition
}

function MoneyCard(props: MoneyCardProps) {
  return (
    <div className="moneyCard">
      <div className="description">
        <div className="text">
        <span className="title">{props.title}</span>
        <span>{props.percentage}</span>
        </div>
        <div className="design">
          <FontAwesomeIcon icon={props.icon} className="icon icon--large"/>
        </div>
      </div>
      <span className="amount">{props.amount} EUR</span>
    </div>
  )
}

export default MoneyCard
