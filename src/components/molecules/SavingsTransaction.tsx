import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { TransactionSource } from '../../types/database'
import Dropdown from '../atoms/Dropdown'
import "../../styles/organisms/TransactionDetails.scss"
import "../../styles/common.scss"

function SavingsTransaction() {

  const [sources, setSources] = useState([{label: 'Wallet', value: TransactionSource.Income}])
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