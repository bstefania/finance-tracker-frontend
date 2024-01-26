import { FormEvent, useEffect, useState } from "react";
import { Option } from "../molecules/Dropdown";
import {
  TRANSACTION_TYPES,
  Transaction,
  TransactionInput,
  TransactionSource,
} from "../../types/database";
import Modal from "../atoms/Modal";
import NewCategory from "../molecules/NewCategory";
import ExpenseTransaction from "../molecules/ExpenseTransaction";
import InvestmentsTransaction from "../molecules/InvestmentsTransaction";
import { showNotification, Notification } from "../../utils/errorHandling";
import styles from "../../styles/organisms/TransactionDetails.module.scss";
import Button from "../atoms/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchCategories } from "../../store/categoriesSlice";
import Input from "../molecules/Input";
import { useInput } from "../../hooks/useInput";
import TransactionTypes from "../atoms/TransactionTypes";
import { insertTransaction } from "../../store/transactionsSlice";

type TransactionDetailsProps = {
  toggleModal: any;
  existingData?: Transaction | null;
};

function TransactionDetails(props: TransactionDetailsProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.entities);

  const [newCategory, setNewCategory] = useState(false);

  const [selectedType, setSelectedType] = useState(TRANSACTION_TYPES[0]);
  const [source, setSource] = useState<TransactionSource>(
    TransactionSource.Income
  );
  const [categoryDropdown, setCategoryDropdown] = useState<
    Record<string, Option[]>
  >({});
  const [category, setCategory] = useState<Option | null>(null);
  const { value: amount, handleInputChange: handleAmountChange, hasError: invalidAmount } = useInput<number | null>(
    null,
    (amount) => amount !== null && amount > 0
  );
  const { value: date, handleInputChange: handleDateChange } = useInput<string>(
    props.existingData?.createdAt
      ? new Date(props.existingData.createdAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );
  const [sharedWith, setSharedWith] = useState<Option[]>([]);
  const [note, setNote] = useState<string | null>(null);

  const TransactionComponent: Record<string, JSX.Element> = {
    expense: <ExpenseTransaction setSource={setSource} />,
    investments: <InvestmentsTransaction />,
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  useEffect(() => {
    setUpCategoryOptions();
  }, [categories])

  const setUpCategoryOptions = async () => {
    setCategoryDropdown(() => {
      const options: Record<string, Option[]> = {};

      Object.entries(categories).forEach(([categoryId, category], _index) => {
        const categoryGroup = category.categoryGroup.name;
        const categoryOption = {
          value: categoryId,
          label: category.name,
        };
        if (categoryGroup in options) {
          options[categoryGroup].push(categoryOption);
        } else {
          options[categoryGroup] = [categoryOption];
        }
      });

      return options;
    });
  };

  useEffect(() => {
  }, [categoryDropdown])

  const toggleNewCategory = () => {
    setNewCategory((oldValue) => !oldValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (invalidAmount) throw Error("Invalid amount!");

      const createdAt = new Date(date);
      const currentDatetime = new Date();
      createdAt.setHours(currentDatetime.getHours());
      createdAt.setMinutes(currentDatetime.getMinutes());
      createdAt.setSeconds(currentDatetime.getSeconds());

      const data: TransactionInput = {
        type: selectedType,
        source,
        categoryId: (category as Option).value,
        amount: amount as number,
        createdAt,
        sharedWith: sharedWith.map((users) => users.value),
        note,
      };

      dispatch(insertTransaction(data))
      props.toggleModal();
    } catch (error: any) {
      showNotification(error.message, Notification.ERROR);
    }
  };

  return !newCategory ? (
    <Modal title="New transaction" toggleModal={props.toggleModal}>
      <form onSubmit={handleSubmit}>
        <TransactionTypes
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        {TransactionComponent[selectedType]}
        <Input
          icon="list"
          isDropdown
          isSearchable
          placeholder="Select Category"
          options={categoryDropdown}
          groups={true}
          addItem={toggleNewCategory}
          onChange={(option: any) => {
            setCategory(option);
          }}
        />
        <Input
          icon="money-bill"
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          required
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <Input
          icon="calendar-days"
          id="date"
          name="date"
          type="date"
          placeholder="Date"
          value={date}
          onChange={handleDateChange}
        />
        <Input
          icon="user-plus"
          isDropdown
          isSearchable
          isMulti
          placeholder="Shared with"
          options={[]}
          onChange={(option: any) => setSharedWith(option)}
        />
        <Input
          icon="note-sticky"
          id="note"
          name="note"
          placeholder="Note..."
          isTextArea
          onChange={(note: any) => setNote(note)}
        />
        <div className={styles["actions"]}>
          <Button secondary onClick={props.toggleModal}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  ) : (
    <NewCategory show={newCategory} toggleModal={toggleNewCategory} />
  );
}

export default TransactionDetails;
