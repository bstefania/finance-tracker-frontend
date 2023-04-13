import React, { useState } from "react"
import "../styles/TransactionDetails.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDays,
  faClose,
  faList,
  faMoneyBill,
  faNoteSticky,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

interface OptionType {
  label: string
  value: string
}

function TransactionDetails(props: any) {
  const options: OptionType[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  const [category, setCategory] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [sharedWith, setSharedWith] = useState<OptionType[]>([])

  return (
    <div className={`modalBackground ${props.show ? "hide" : ""}`}>
      <div className="modalContent">
        <div className="header">
          <h1>Add transaction</h1>
          <FontAwesomeIcon
            icon={faClose}
            className="iconWithAction"
            onClick={props.toggleModal}
          />
        </div>
        <div className="body">
          <form action="">
            <div className="type">
              <span className="selected">Expense</span>
              <span>Saving</span>
              <span>Investment</span>
              <span>Income</span>
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faList} className="icon" />
              <Select
                className="dropdown"
                value={category}
                onChange={(option: any) => setCategory(option)}
                options={options}
                placeholder="Category"
              />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faMoneyBill} className="icon" />
              <input
                type="number"
                id="amount"
                min="1"
                required
                placeholder="Amount"
              />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faCalendarDays} className="icon" />
              <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} placeholder="Date" />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faUserPlus} className="icon" />
              <Select
                isMulti
                className="dropdown"
                value={sharedWith}
                onChange={(option: any) => setSharedWith(option)}
                options={options}
                placeholder="Shared with"
              />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
              <textarea id="note" placeholder="Note..." />
            </div>
          </form>
        </div>
        <div className="footer">
          <button className="button--secondary" onClick={props.toggleModal}>
            Cancel
          </button>
          <button>Save</button>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails
