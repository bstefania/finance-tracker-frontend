import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/atoms/Dropdown.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export type Option = {
  label: string;
  value: any;
};

type DropdownProps = {
  placeholder: string;
  options: Option[] | Record<string, Option[]>;
  groups?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange: (newValue: Option[] | Option) => void;
  addItem?: () => void;
};

const Dropdown = ({
  placeholder,
  options,
  groups = false,
  isMulti = false,
  isSearchable = false,
  addItem,
  onChange,
}: DropdownProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option[] | Option | null>(
    isMulti ? [] : (options as Option[])[0]
  );
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useOutsideClick(inputRef, () => setShowMenu(false))

  const handleInputClick = (e: any) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || (selectedValue as Option[]).length === 0) {
      return placeholder;
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
                <FontAwesomeIcon icon={faXmark} className="icon-with-action" />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return (selectedValue as Option).label;
  };

  const removeOption = (option: Option) => {
    return (selectedValue as Option[]).filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e: any, option: Option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option: Option) => {
    let newValue;
    if (isMulti) {
      if (
        (selectedValue as Option[]).findIndex(
          (o) => o.value === option.value
        ) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...(selectedValue as Option[]), option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: Option) => {
    if (isMulti) {
      return (
        (selectedValue as Option[]).filter((o) => o.value === option.value)
          .length > 0
      );
    }

    if (!selectedValue) {
      return false;
    }

    return (selectedValue as Option).value === option.value;
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const filterOptions = (options: Option[]) => {
    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    if (!groups) {
      return filterOptions(options as Option[]);
    } else {
      return Object.entries(options as Record<string, Option[]>).flatMap(
        ([group, options]) => {
          const filteredOptions = filterOptions(options);
          if (filteredOptions) {
            return { group: filterOptions };
          } else {
            return {};
          }
        }
      );
    }
  };

  const optionsDiv = (options: Option[]) => {
    return options.map((option) => (
      <div
        onClick={() => onItemClick(option)}
        key={option.value}
        className={`dropdown-item ${isSelected(option) && "selected"}`}
      >
        {option.label}
      </div>
    ));
  };

  return (
    <div className="dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <FontAwesomeIcon
              icon={!showMenu ? faChevronDown : faChevronUp}
              className="icon-with-action"
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
          {!groups
            ? optionsDiv(getOptions() as Option[])
            : Object.entries(options as Record<string, Option[]>).map(
                ([group, options]) => (
                  <div key={group}>
                    <span className="dropdown-group">{group}</span>
                    {optionsDiv(options)}
                  </div>
                )
              )}
          {addItem && (
            <div className="new-list-item" onClick={addItem}>
              + Add new
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
