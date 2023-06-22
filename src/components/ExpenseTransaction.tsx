import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Dropdown from './Dropdown'

function ExpenseTransaction() {

  const [sources, setSources] = useState([{label: 'Wallet', value: 'income'}, {label: 'Savings', value: 'savings'}])
  const [source, setSource] = useState(null)
  return (
    <div className="modalField">
    <FontAwesomeIcon icon={faArrowUpFromBracket} className="icon" />
    <Dropdown
      isSearchable
      placeholder="Select Source"
      options={sources}
      groups={false}
      onChange={(option: any) => {
        setSource(option)
      }}
    />
  </div>
  )
}

export default ExpenseTransaction