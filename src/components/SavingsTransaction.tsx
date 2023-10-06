import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Dropdown from './Dropdown'

function SavingsTransaction() {

  const [sources, setSources] = useState([{label: 'Wallet', value: 'income'}])
  const [source, setSource] = useState(null)
  return (
    <div className="modal-field">
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

export default SavingsTransaction