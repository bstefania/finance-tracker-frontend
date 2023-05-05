import React, { FormEvent, useEffect, useState } from "react"
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
import Dropdown, {Option} from "./Dropdown"
import { axiosPrivate } from "../api/axios"
import { Category } from "../types/database"

function TransactionDetails(props: any) {
  const transactionTypes = ["Expense", "Saving", "Investment", "Income"]

  const options: Option[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  const [categories, setCategories] = useState<Option[]>([])

  const [selectedType, setSelectedType] = useState(transactionTypes[0])
  const [category, setCategory] = useState<Option | null>(null)
  const [validCategory, setValidCategory] = useState(true)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [sharedWith, setSharedWith] = useState<Option[]>([])
  const [note, setNote] = useState(null)

  useEffect(() => {
    getCategories()
  }, [])
  
  const getCategories = () => {
    axiosPrivate.get("/categories").then(res => {
      const categoryOptions = res.data.data.map((category: Category, index: string) => {
        return {
          value: category.id,
          label: category.name
        }
      })
      setCategories(categoryOptions)
    }).catch((err) => {
      console.log(err)
    })
  }

  const validateCategory = () => {
    if (!category) {
      setValidCategory(false)
      return false
    }
    return true
  }

  const validateAmount = () => {
    if (!amount || amount < 1) return false
    return true
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (!validateCategory() || !validateAmount()) {
        console.log("Incorrect input data!")
        return
      }

    const data = {
      type: selectedType,
      categoryId: (category as Option).value,
      amount,
      date,
      sharedWith: sharedWith.map((users) => users.value),
      note
    }
    console.log(data)
    axiosPrivate.post("/transactions", data).then(res => {
      console.log(res.data)
      props.toggleModal()
    })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`modalBackground ${props.show ? "" : "hide"}`}>
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
          <form onSubmit={handleSubmit}>
            <div className="type">
              {transactionTypes.map((transactionType) => (
                <span
                  key={transactionType}
                  className={selectedType === transactionType ? "selected" : ""}
                  onClick={() => setSelectedType(transactionType)}
                >
                  {transactionType}
                </span>
              ))}
            </div>
            <div className={`modalField ${!validCategory && "invalidField"}`}>
              <FontAwesomeIcon icon={faList} className="icon" />
              <Dropdown
                isSearchable
                placeholder="Category"
                options={categories}
                onChange={(option: any) => { setCategory(option); setValidCategory(true) }}
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
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faCalendarDays} className="icon" />
              <input
                type="date"
                id="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="Date"
              />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faUserPlus} className="icon" />
              <Dropdown
                isSearchable
                isMulti
                placeholder="Shared with"
                options={options}
                onChange={(option: any) => setSharedWith(option)}
              />
            </div>
            <div className="modalField">
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
              <textarea
                id="note"
                placeholder="Note..."
                onChange={(note: any) => setNote(note)}
              />
            </div>
            <div className="actions">
              <button type="button" className="button--secondary" onClick={props.toggleModal}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails
