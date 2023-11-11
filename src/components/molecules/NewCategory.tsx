import { FormEvent, useEffect, useState } from "react";
import Modal from "../atoms/Modal";
import {
  CategoryGroup,
  CategoryGroupInput,
  CategoryInput,
} from "../../types/database";
import Dropdown, { Option } from "../atoms/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomColor } from "../../utils/colorPicker";
import { showNotification, Notification } from "../../utils/errorHandling";
import {
  getCategoryGroups,
  postCategories,
  postCategoryGroups,
} from "../../api/categories";
import IconPicker from "../utils/IconPicker";
import "../../styles/molecules/NewCategory.scss";

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
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          {!newCategoryGroup ? (
            <div className="modal-field">
              <FontAwesomeIcon icon="list" className="icon" />
              <Dropdown
                isSearchable
                placeholder="Select Category Group"
                options={categoryGroups}
                addItem={toggleNewCategoryGroup}
                onChange={(option: any) => {
                  setCategoryGroup(option);
                }}
              />
            </div>
          ) : (
            <div className="modal-field">
              <FontAwesomeIcon icon="folder-tree" className="icon" />
              <input
                type="text"
                id="newCategoryGroupName"
                required
                placeholder="New category group"
                onChange={(e) => setNewCategoryGroupName(e.target.value)}
              />
              <IconPicker
                icon={groupIcon}
                setIcon={setGroupIcon}
                color={groupColor}
                setColor={setGroupColor}
              />
            </div>
          )}
          <div className="modal-field">
            <FontAwesomeIcon icon="folder" className="icon" />
            <input
              type="text"
              id="name"
              required
              placeholder="Category"
              onChange={(e) => setName(e.target.value)}
            />
            <IconPicker
              icon={icon}
              setIcon={setIcon}
              color={color}
              setColor={setColor}
            />
          </div>
          <div className="modal-field">
            <FontAwesomeIcon icon="user-plus" className="icon" />
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
  );
}

export default NewCategory;
