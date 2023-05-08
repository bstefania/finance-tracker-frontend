import React, { FormEvent, useEffect, useState } from "react"
import "../styles/TransactionDetails.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDays,
  faList,
  faMoneyBill,
  faNoteSticky,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import Dropdown, { Option } from "./Dropdown"
import { axiosPrivate } from "../api/axios"
import { Category } from "../types/database"
import Modal from "./Modal"
import NewCategory from "./NewCategory"

function TransactionDetails(props: any) {
  const transactionTypes = ["Expense", "Saving", "Investment", "Income"]
  const [categories, setCategories] = useState<Option[]>([])

  const [selectedType, setSelectedType] = useState(transactionTypes[0])
  const [category, setCategory] = useState<Option | null>(null)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [sharedWith, setSharedWith] = useState<Option[]>([])
  const [note, setNote] = useState(null)

  const [newCategory, setNewCategory] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    axiosPrivate
      .get("/categories")
      .then((res) => {
        const categoryOptions = res.data.data.map(
          (category: Category, index: string) => {
            return {
              value: category.id,
              label: category.name,
            }
          }
        )
        setCategories(categoryOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const toggleNewCategory = (listChanged?: boolean) => {
    setNewCategory(!newCategory)
    if (listChanged) {
      getCategories()
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const data = {
        type: selectedType,
        categoryId: (category as Option).value,
        amount,
        createdAt: new Date(date),
        sharedWith: sharedWith.map((users) => users.value),
        note,
      }

      await axiosPrivate.post("/transactions", data)
      props.toggleModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  return newCategory ? (
    <Modal
      title={"New transaction"}
      toggleModal={props.toggleModal}
    >
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
          <div className="modalField">
            <FontAwesomeIcon icon={faList} className="icon" />
            <Dropdown
              isSearchable
              placeholder="Select Category"
              options={categories}
              addItem={toggleNewCategory}
              onChange={(option: any) => {
                setCategory(option)
              }}
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
              options={[]}
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
            <button
              type="button"
              className="button--secondary"
              onClick={props.toggleModal}
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </Modal>
  ) : (
    <NewCategory show={newCategory} toggleModal={toggleNewCategory}/>
  )
}

export default TransactionDetails
