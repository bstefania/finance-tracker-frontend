import { FormEvent, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDays,
  faList,
  faMoneyBill,
  faNoteSticky,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import Dropdown, { Option } from "../atoms/Dropdown"
import { Category, TransactionSource } from "../../types/database"
import Modal from "../atoms/Modal"
import NewCategory from "../molecules/NewCategory"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import ExpenseTransaction from "../molecules/ExpenseTransaction"
import InvestmentsTransaction from "../molecules/InvestmentsTransaction"
import useWealth from "../../hooks/useWealth"
import "../../styles/organisms/TransactionDetails.scss"

function TransactionDetails(props: any) {

  const axiosPrivate = useAxiosPrivate()

  const { fetchWealth } = useWealth()

  const transactionTypes = ["expense", "savings", "investments", "income"]
  const [source, setSource] = useState<TransactionSource>(TransactionSource.Income);
  const [categories, setCategories] = useState<Record<string, Option[]>>({})

  const [selectedType, setSelectedType] = useState(transactionTypes[0])
  const [category, setCategory] = useState<Option | null>(null)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [sharedWith, setSharedWith] = useState<Option[]>([])
  const [note, setNote] = useState(null)

  const [newCategory, setNewCategory] = useState(false)

  const TransactionComponent: Record<string, JSX.Element> = {
    expense: <ExpenseTransaction setSource={setSource}/>,
    investments: <InvestmentsTransaction/>,
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
      const res = await axiosPrivate.get("/categories")

      const categoryOptions: Record<string, Option[]> = {}

      res.data.data.forEach((category: Category, index: string) => {
        const categoryGroup = category.categoryGroup.name
        const data = {
          value: category.id,
          label: category.name,
        }
        if (categoryGroup in categoryOptions) {
          categoryOptions[categoryGroup].push(data)
        } else {
          categoryOptions[categoryGroup] = [data]
        }
      })

      setCategories(categoryOptions)
    } catch (err) {
      console.log(err)
    }
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
        source: source,
        categoryId: (category as Option).value,
        amount,
        createdAt: new Date(date),
        sharedWith: sharedWith.map((users) => users.value),
        note,
      }

      await axiosPrivate.post("/transactions", data)
      fetchWealth()
      props.toggleModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  return !newCategory ? (
    <Modal title={"New transaction"} toggleModal={props.toggleModal}>
      <div className="modal-body">
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
          {TransactionComponent[selectedType]}
          <div className="modal-field">
            <FontAwesomeIcon icon={faList} className="icon" />
            <Dropdown
              isSearchable
              placeholder="Select Category"
              options={categories}
              groups={true}
              addItem={toggleNewCategory}
              onChange={(option: any) => {
                setCategory(option)
              }}
            />
          </div>
          <div className="modal-field">
            <FontAwesomeIcon icon={faMoneyBill} className="icon" />
            <input
              type="number"
              id="amount"
              step="0.01"
              min="1"
              required
              placeholder="Amount"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className="modal-field">
            <FontAwesomeIcon icon={faCalendarDays} className="icon" />
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="Date"
            />
          </div>
          <div className="modal-field">
            <FontAwesomeIcon icon={faUserPlus} className="icon" />
            <Dropdown
              isSearchable
              isMulti
              placeholder="Shared with"
              options={[]}
              onChange={(option: any) => setSharedWith(option)}
            />
          </div>
          <div className="modal-field">
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
    <NewCategory show={newCategory} toggleModal={toggleNewCategory} />
  )
}

export default TransactionDetails
