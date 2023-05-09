import React from 'react'
import "../styles/UpcomingPayments.css"
import { TransactionType } from '../types/database'

type UpcomingTransactionsProps = {
  type?: TransactionType
}

function UpcomingTransactions({type}: UpcomingTransactionsProps) {
  return (
    <div className="upcomingPayments">
      <h1>Upcoming transactions</h1>
    </div>  )
}

export default UpcomingTransactions