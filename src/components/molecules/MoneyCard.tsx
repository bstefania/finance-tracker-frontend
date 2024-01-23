import { useRef, useState } from "react";
import { patchWealth } from "../../api/user";
import { MoneyCardType, TransactionType } from "../../types/database";
import useWealth from "../../hooks/useWealth";
import { ron, formatDecimals } from "../../utils/numberFormat";
import { Notification, showNotification } from "../../utils/errorHandling";
import styles from "../../styles/molecules/MoneyCard.module.scss";
import Icon from "../atoms/Icon";

type MoneyCardProps = {
  type: MoneyCardType;
};

const MoneyCard = (props: MoneyCardProps) => {
  const { wealth, setWealth } = useWealth();
  const [editMode, setEditMode] = useState(false);
  const [amount, setAmount] = useState(wealth?.category[props.type].value);
  const inputRef = useRef<HTMLInputElement>(null);

  const details: Partial<Record<TransactionType, any>> = {
    income: {
      title: "Wallet",
      icon: 'wallet',
    },
    savings: {
      title: "Savings",
      icon: 'piggy-bank',
    },
    investments: {
      title: "Investments",
      icon: 'money-bill-trend-up',
    },
  };

  const toggleEditMode = () => {
    setEditMode((oldValue) => !oldValue);
  };
  
  const updateWealth = async (event: any) => {
    if (event.key === "Enter") {
      if (amount === wealth?.category[props.type].value) return;
      try {
        const data = { [props.type]: amount };
        const updatedData = await patchWealth(data);
        setWealth(updatedData);
        toggleEditMode();
        // showNotification("Wealth updated successfully!", Notification.SUCCESS);
      } catch (error: any) {
        showNotification(error.message, Notification.ERROR);
      }
    }
  };

  return (
    <div className={styles["money-card"]}>
      <div className={styles["title"]}>
        <span>{details[props.type].title}</span>
        <span className={styles[`label-${props.type}`]}>
          {formatDecimals(wealth?.category[props.type].percentage)}%
        </span>
      </div>
      <div className={styles["amount"]}>
        {editMode ? (
          <input
            id="amount"
            type="number"
            className={styles["edit-field"]}
            ref={inputRef}
            autoFocus
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            onKeyDown={updateWealth}
            onBlur={toggleEditMode}
          />
        ) : (
          <div className={styles["current-amount"]}>
            <div className={styles["value"]}>
              <span>
                {ron.format(wealth?.category[props.type].value ?? 0)}
              </span>
              <Icon
                icon="pencil"
                className={styles["edit-icon"]}
                onClick={toggleEditMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyCard;
