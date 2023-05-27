import { faPencil, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"
import { TransactionType } from '../types/database'

type MoneyCardProps = {
  type: TransactionType
  percentage: number | undefined
  amount: number | undefined
  icon: IconDefinition
}

function MoneyCard(props: MoneyCardProps) {

  const titles: Partial<Record<TransactionType, string>> = {
    [TransactionType.Income]: "Wallet",
    [TransactionType.Savings]: "Savings",
    [TransactionType.Investments]: "Investments",
    [TransactionType.Credit]: "Credit",
  }

  return (
    <div className="moneyCard">
      <div className="description">
        <div className="text">
        <span className="title">{titles[props.type]}</span>
        <span>{props.percentage}%</span>
        </div>
        <div className="design">
          <FontAwesomeIcon icon={props.icon} className="icon icon--large"/>
        </div>
      </div>
      <span className="amount">{props.amount} EUR <FontAwesomeIcon icon={faPencil} className="editIcon"/></span>
    </div>
  )
}

export default MoneyCard
