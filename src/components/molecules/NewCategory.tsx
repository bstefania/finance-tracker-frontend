import { FormEvent, useEffect, useState } from "react";
import Modal from "../atoms/Modal";
import {
  CategoryGroup,
  CategoryGroupInput,
  CategoryInput,
} from "../../types/database";
import { Option } from "./Dropdown";
import { getRandomColor } from "../../utils/colorPicker";
import { showNotification, Notification } from "../../utils/errorHandling";
import {
  getCategoryGroups,
  postCategories,
  postCategoryGroups,
} from "../../api/categories";
import IconPicker from "../utils/IconPicker";
import styles from "../../styles/molecules/NewCategory.module.scss";
import Button from "../atoms/Button";
import Input from "./Input";

type NewCategoryProps = {
  show: boolean;
  toggleModal: (listChanged?: boolean) => void;
};

function NewCategory({ toggleModal }: NewCategoryProps) {
  const [categoryGroups, setCategoryGroups] = useState<Option[]>([]);
  const [name, setName] = useState("");
  const [categoryGroup, setCategoryGroup] = useState<Option | null>(null);
  const [sharedWith, setSharedWith] = useState<Option[]>([]);
  const [newCategoryGroup, setNewCategoryGroup] = useState(false);
  const [newCategoryGroupName, setNewCategoryGroupName] = useState("");
  const [icon, setIcon] = useState<string>("question-circle");
  const [groupIcon, setGroupIcon] = useState<string>("question-circle");
  const [color, setColor] = useState(getRandomColor());
  const [groupColor, setGroupColor] = useState(getRandomColor());

  useEffect(() => {
    fetchCategoryGroups();
  }, []);

  const fetchCategoryGroups = () => {
    getCategoryGroups()
      .then((data: CategoryGroup[]) => {
        const categoryGroupOptions = data.map(
          (categoryGroup: CategoryGroup) => {
            return {
              value: categoryGroup.id,
              label: categoryGroup.name,
            };
          }
        );
        setCategoryGroups(categoryGroupOptions);
      })
      .catch((error: any) => {
        showNotification(error.message, Notification.ERROR);
      });
  };

  const toggleNewCategoryGroup = () => {
    setNewCategoryGroup(!newCategoryGroup);
  };

  const createCategoryGroup = async () => {
    const data: CategoryGroupInput = {
      name: newCategoryGroupName,
      color: groupColor,
      icon: groupIcon,
      sharedWith: sharedWith.map((users) => users.value),
    };

    return postCategoryGroups(data);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data: CategoryInput = {
        name,
        color: color,
        icon: icon,
        categoryGroupId: undefined,
        sharedWith: sharedWith.map((users) => users.value),
      };

      if (!newCategoryGroup) {
        data.categoryGroupId = (categoryGroup as Option).value;
      } else {
        // TODO: one request - transaction with rollback
        const categoryGroupData = await createCategoryGroup();
        data.categoryGroupId = categoryGroupData.id;
      }

      await postCategories(data);
      toggleModal(true);
    } catch (error: any) {
      showNotification(error.message, Notification.ERROR);
    }
  };

  return (
    <Modal title={"New category"} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        {!newCategoryGroup ? (
          <Input
            icon="list"
            isDropdown
            isSearchable
            placeholder="Select Category Group"
            options={categoryGroups}
            addItem={toggleNewCategoryGroup}
            onChange={(option: any) => {
              setCategoryGroup(option);
            }}
          />
        ) : (
          <Input
            icon="folder-tree"
            type="text"
            id="newCategoryGroupName"
            required
            placeholder="New category group"
            onChange={(e: any) => setNewCategoryGroupName(e.target.value)}
          >
            <IconPicker
              icon={groupIcon}
              setIcon={setGroupIcon}
              color={groupColor}
              setColor={setGroupColor}
            />
          </Input>
        )}
        <Input
          icon="folder"
          type="text"
          id="name"
          required
          placeholder="Category"
          onChange={(e: any) => setName(e.target.value)}
        >
          <IconPicker
            icon={icon}
            setIcon={setIcon}
            color={color}
            setColor={setColor}
          />
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

export default NewCategory;
