import React, { FormEvent, useEffect, useState } from "react"
import Modal from "./Modal"
import { CategoryGroup } from "../types/database"
import Dropdown, { Option } from "./Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFolder,
  faFolderTree,
  faList,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import ColorPicker from "./utils/ColorPicker"
import { getRandomColor } from "../utils/colorPicker"


type NewCategoryProps = {
  show: boolean
  toggleModal: (listChanged?: boolean) => void
}

function NewCategory({ toggleModal }: NewCategoryProps) {
  const axiosPrivate = useAxiosPrivate()

  const [categoryGroups, setCategoryGroups] = useState([])
  const [name, setName] = useState("")
  const [categoryGroup, setCategoryGroup] = useState<Option | null>(null)
  const [sharedWith, setSharedWith] = useState<Option[]>([])
  const [newCategoryGroup, setNewCategoryGroup] = useState(false)
  const [newCategoryGroupName, setNewCategoryGroupName] = useState('')
  const [color, setColor] = useState(getRandomColor())
  const [groupColor, setGroupColor] = useState(getRandomColor())

  useEffect(() => {
    getCategoryGroups()
  }, [])

  const getCategoryGroups = () => {
    axiosPrivate
      .get("/categoryGroups")
      .then((res) => {
        const categoryGroupOptions = res.data.data.map(
          (categoryGroup: CategoryGroup, index: string) => {
            return {
              value: categoryGroup.id,
              label: categoryGroup.name,
            }
          }
        )
        setCategoryGroups(categoryGroupOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const toggleNewCategoryGroup = () => {
    setNewCategoryGroup(!newCategoryGroup)
  }

  const createCategoryGroup = async () => {
    const data = {
      name: newCategoryGroupName,
      color: groupColor,
      sharedWith: sharedWith.map((users) => users.value),
    }

    return axiosPrivate.post("/categoryGroups", data)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const data: any = {
        name,
        color: color,
        sharedWith: sharedWith.map((users) => users.value),
      }

      if (!newCategoryGroup) {
        data.categoryGroupId = (categoryGroup as Option).value
      } else {
        const res = await createCategoryGroup()
        console.log(res.data.data)
        data.categoryGroupId = res.data.data.id
      }

      console.log(data)
      await axiosPrivate.post("/categories", data)
      toggleModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal title={"New category"} toggleModal={toggleModal}>
      <div className="body">
        <form onSubmit={handleSubmit}>
          {!newCategoryGroup ? (
            <div className="modal-field">
              <FontAwesomeIcon icon={faList} className="icon" />
              <Dropdown
                isSearchable
                placeholder="Select Category Group"
                options={categoryGroups}
                addItem={toggleNewCategoryGroup}
                onChange={(option: any) => {
                  setCategoryGroup(option)
                }}
              />
            </div>
          ) : (
            <div className="modal-field">
              <FontAwesomeIcon icon={faFolderTree} className="icon" />
              <input
                type="text"
                id="newCategoryGroupName"
                required
                placeholder="New category group"
                onChange={(e) => setNewCategoryGroupName(e.target.value)}
              />
              <ColorPicker color={groupColor} setColor={setGroupColor}></ColorPicker>
            </div>
          )}
          <div className="modal-field">
            <FontAwesomeIcon icon={faFolder} className="icon" />
            <input
              type="text"
              id="name"
              required
              placeholder="Category"
              onChange={(e) => setName(e.target.value)}
            />
            <ColorPicker color={color} setColor={setColor} />
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
          <div className="actions">
            <button
              type="button"
              className="button--secondary"
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default NewCategory
