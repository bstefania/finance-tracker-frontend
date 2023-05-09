import React from 'react'
import "../styles/MonthlyExpenses.css"
import { TransactionType } from '../types/database'

type MonthlyTransactionsProps = {
  type?: TransactionType
}

function MonthlyTransactions({type}: MonthlyTransactionsProps) {
  return (
    <div className="monthlyExpenses">
      <h1>Monthly transactions</h1>
    </div>
  )
}

export default MonthlyTransactions