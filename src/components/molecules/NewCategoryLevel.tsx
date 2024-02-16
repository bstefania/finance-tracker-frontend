import { FormEvent, useEffect, useState } from "react";
import Modal from "../atoms/Modal";
import { CategoryGroupInput, CategoryInput } from "../../types/database";
import { Option } from "./Dropdown";
import { getRandomColor } from "../../utils/colorPicker";
import IconPicker from "../utils/IconPicker";
import styles from "../../styles/molecules/NewCategoryLevel.module.scss";
import Button from "../atoms/Button";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { categoryGroupsActions } from "../../store/categoryGroupsSlice";
import { categoriesActions } from "../../store/categoriesSlice";

export enum CategoryLevel {
  CATEGORY = "category",
  CATEGORY_GROUP = "categoryGroup",
}

const modalTitles = {
  [CategoryLevel.CATEGORY]: "New category",
  [CategoryLevel.CATEGORY_GROUP]: "New category group",
};

type NewCategoryProps = {
  level: CategoryLevel;
  open: boolean;
  toggleModal: (listChanged?: boolean) => void;
};

function NewCategoryLevel({ level, open, toggleModal }: NewCategoryProps) {
  const dispatch = useAppDispatch();
  const categoryGroups = useAppSelector((state) => state.categoryGroups.entities);

  const [name, setName] = useState("");
  const [categoryGroupOptions, setCategoryGroupOptions] = useState<Option[]>([]);
  const [categoryGroupOption, setCategoryGroupOption] = useState<Option | null>(null);
  const [sharedWith, setSharedWith] = useState<Option[]>([]);
  const [icon, setIcon] = useState<string>("question-circle");
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    dispatch(categoryGroupsActions.fetchCategoryGroups());
  }, [dispatch]);

  useEffect(() => {
    setCategoryGroupOptions(
      Object.entries(categoryGroups).map(([id, categoryGroup]) => {
        return {
          value: categoryGroup.id,
          label: categoryGroup.name,
        };
      })
    );
  }, [categoryGroups])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: any = {
      name,
      color: color,
      icon: icon,
      sharedWith: sharedWith.map((users) => users.value),
    };

    if (level === CategoryLevel.CATEGORY) {
      data.categoryGroupId = (categoryGroupOption as Option).value;
      dispatch(categoriesActions.insertCategory(data as CategoryInput));
    } else {
      dispatch(categoryGroupsActions.insertCategoryGroup(data as CategoryGroupInput));
    }
    toggleModal();
  };

  return (
    <Modal title={modalTitles[level]} open={open} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        {level === CategoryLevel.CATEGORY && (
          <Input
            icon="list"
            isDropdown
            isSearchable
            placeholder="Select Category Group"
            options={categoryGroupOptions}
            onChange={(option: any) => {
              setCategoryGroupOption(option);
            }}
          />
        )}
        <Input
          icon="folder"
          type="text"
          id="name"
          required
          placeholder={level === CategoryLevel.CATEGORY ? "Category" : "Category group"}
          onChange={(e: any) => setName(e.target.value)}
        >
          <IconPicker icon={icon} setIcon={setIcon} color={color} setColor={setColor} />
        </Input>
        <Input
          icon="user-plus"
          isDropdown
          isSearchable
          isMulti
          placeholder="Shared with"
          options={[]}
          onChange={(option: any) => setSharedWith(option)}
        />
        <div className={styles["actions"]}>
          <Button secondary onClick={() => toggleModal()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewCategoryLevel;
