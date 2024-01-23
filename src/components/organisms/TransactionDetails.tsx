import { FormEvent, useEffect, useState } from "react";
import Dropdown, { Option } from "../molecules/Dropdown";
import {
  Category,
  Transaction,
  TransactionInput,
  TransactionSource,
  TransactionType,
} from "../../types/database";
import Modal from "../atoms/Modal";
import NewCategory from "../molecules/NewCategory";
import ExpenseTransaction from "../molecules/ExpenseTransaction";
import InvestmentsTransaction from "../molecules/InvestmentsTransaction";
import useWealth from "../../hooks/useWealth";
import { getCategories } from "../../api/categories";
import { showNotification, Notification } from "../../utils/errorHandling";
import { postTransactions } from "../../api/transactions";
import styles from "../../styles/organisms/TransactionDetails.module.scss";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";

type TransactionDetailsProps = {
  toggleModal: any;
  existingData?: Transaction | null;
};

function TransactionDetails(props: TransactionDetailsProps) {
  const { fetchWealth } = useWealth();

  const transactionTypes = [
    TransactionType.Expense,
    TransactionType.Savings,
    TransactionType.Investments,
    TransactionType.Income,
  ];
  const [source, setSource] = useState<TransactionSource>(
    TransactionSource.Income
  );
  const [categories, setCategories] = useState<Record<string, Option[]>>({});

  const [_id, setId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState(transactionTypes[0]);
  const [category, setCategory] = useState<Option | null>(null);
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [sharedWith, setSharedWith] = useState<Option[]>([]);
  const [note, setNote] = useState<string | null>(null);

  const [newCategory, setNewCategory] = useState(false);

  const TransactionComponent: Record<string, JSX.Element> = {
    expense: <ExpenseTransaction setSource={setSource} />,
    investments: <InvestmentsTransaction />,
  };

  useEffect(() => {
    fetchCategories();
    if (props.existingData) {
      console.log(props.existingData);
      setId(props.existingData.id);
      setSource(props.existingData.source);
      setSelectedType(props.existingData.type);
      setAmount(props.existingData.amount);
      setDate(
        new Date(props.existingData.createdAt).toISOString().slice(0, 10)
      );
      setNote(props.existingData.note);
    }
  }, []);

  const fetchCategories = async () => {
    getCategories()
      .then((data: Category[]) => {
        const categoryOptions: Record<string, Option[]> = {};
        data.forEach((category: Category) => {
          const categoryGroup = category.categoryGroup.name;
          const categoryOption = {
            value: category.id,
            label: category.name,
          };
          if (categoryGroup in categoryOptions) {
            categoryOptions[categoryGroup].push(categoryOption);
          } else {
            categoryOptions[categoryGroup] = [categoryOption];
          }
        });
        setCategories(categoryOptions);
      })
      .catch((error: any) => {
        showNotification(error.message, Notification.ERROR);
      });
  };

  const toggleNewCategory = (listChanged?: boolean) => {
    setNewCategory(!newCategory);
    if (listChanged) {
      getCategories();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!amount) throw new Error("Transaction amount is not set!");

      const createdAt = new Date(date);
      const currentDatetime = new Date();
      createdAt.setHours(currentDatetime.getHours());
      createdAt.setMinutes(currentDatetime.getMinutes());
      createdAt.setSeconds(currentDatetime.getSeconds());
      console.log(category);

      const data: TransactionInput = {
        type: selectedType,
        source,
        categoryId: (category as Option).value,
        amount,
        createdAt,
        sharedWith: sharedWith.map((users) => users.value),
        note,
      };

      await postTransactions(data);
      fetchWealth();
      props.toggleModal(true);
    } catch (error: any) {
      showNotification(error.message, Notification.ERROR);
    }
  };

  return !newCategory ? (
    <Modal title={"New transaction"} toggleModal={props.toggleModal}>
      <div className={styles["modal-body"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["type"]}>
            {transactionTypes.map((transactionType) => (
              <span
                key={transactionType}
                className={
                  selectedType === transactionType ? styles["selected"] : ""
                }
                onClick={() => setSelectedType(transactionType)}
              >
                {transactionType}
              </span>
            ))}
          </div>
          {TransactionComponent[selectedType]}
          <div className={styles["modal-field"]}>
            <Icon icon="list" />
            <Dropdown
              isSearchable
              placeholder="Select Category"
              options={categories}
              groups={true}
              addItem={toggleNewCategory}
              onChange={(option: any) => {
                setCategory(option);
              }}
            />
          </div>
          <div className={styles["modal-field"]}>
            <Icon icon="money-bill" />
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0.01"
              required
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles["modal-field"]}>
            <Icon icon="calendar-days" />
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="Date"
            />
          </div>
          <div className={styles["modal-field"]}>
            <Icon icon="user-plus" />
            <Dropdown
              isSearchable
              isMulti
              placeholder="Shared with"
              options={[]}
              onChange={(option: any) => setSharedWith(option)}
            />
          </div>
          <div className={styles["modal-field"]}>
            <Icon icon="note-sticky" />
            <textarea
              id="note"
              placeholder="Note..."
              onChange={(note: any) => setNote(note)}
            />
          </div>
          <div className={styles["actions"]}>
            <Button secondary onClick={props.toggleModal}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </Modal>
  ) : (
    <NewCategory show={newCategory} toggleModal={toggleNewCategory} />
  );
}

export default TransactionDetails;
