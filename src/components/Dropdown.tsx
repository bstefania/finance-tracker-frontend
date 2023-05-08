import React, { useEffect, useRef, useState } from "react"

import "../styles/Dropdown.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

export type Option = {
  label: string
  value: string
}

type DropdownProps = {
  placeholder: string
  options: Option[]
  isMulti?: boolean
  isSearchable?: boolean
  onChange: (newValue: Option[] | Option) => void
  addItem?: () => void
}

const Dropdown = ({
  placeholder,
  options,
  isMulti = false,
  isSearchable = false,
  addItem,
  onChange,
}: DropdownProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Option[] | Option | null>(
    isMulti ? [] : null
  )
  const [searchValue, setSearchValue] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchValue("")
    if (showMenu && searchRef.current) {
      searchRef.current.focus()
    }
  }, [showMenu])

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    window.addEventListener("click", handler)
    return () => {
      window.removeEventListener("click", handler)
    }
  })
  const handleInputClick = (e: any) => {
    setShowMenu(!showMenu)
  }

  const getDisplay = () => {
    if (!selectedValue || (selectedValue as Option[]).length === 0) {
      return placeholder
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {(selectedValue as Option[]).map((option) => (
            <div key={option.value} className="dropdown-tag-item">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                <FontAwesomeIcon icon={faXmark} className="iconWithAction" />
              </span>
            </div>
          ))}
        </div>
      )
    }
    return (selectedValue as Option).label
  }

  const removeOption = (option: Option) => {
    return (selectedValue as Option[]).filter((o) => o.value !== option.value)
  }

  const onTagRemove = (e: any, option: Option) => {
    e.stopPropagation()
    const newValue = removeOption(option)
    setSelectedValue(newValue)
    onChange(newValue)
  }

  const onItemClick = (option: Option) => {
    let newValue
    if (isMulti) {
      if (
        (selectedValue as Option[]).findIndex(
          (o) => o.value === option.value
        ) >= 0
      ) {
        newValue = removeOption(option)
      } else {
        newValue = [...(selectedValue as Option[]), option]
      }
    } else {
      newValue = option
    }
    setSelectedValue(newValue)
    onChange(newValue)
  }

  const isSelected = (option: Option) => {
    if (isMulti) {
      return (
        (selectedValue as Option[]).filter((o) => o.value === option.value)
          .length > 0
      )
    }

    if (!selectedValue) {
      return false
    }

    return (selectedValue as Option).value === option.value
  }

  const onSearch = (e: any) => {
    setSearchValue(e.target.value)
  }

  const getOptions = () => {
    if (!searchValue) {
      return options
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    )
  }

  return (
    <div className="dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <FontAwesomeIcon
              icon={!showMenu ? faChevronDown : faChevronUp}
              className="iconWithAction"
            />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isSearchable && (
            <div className="search-box">
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.label}
            </div>
          ))}
          <div className="newListItem" onClick={addItem}>+ Add new</div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
