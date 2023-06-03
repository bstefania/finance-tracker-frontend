import {
  faMoneyBillTrendUp,
  faPencil,
  faPiggyBank,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { patchWealth } from "../api/user";
import { MoneyCardType, TransactionType } from "../types/database";
import useWealth from "../hooks/useWealth";
import useOutsideClick from "../hooks/useOutsideClick";

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
      icon: faWallet,
    },
    savings: {
      title: "Savings",
      icon: faPiggyBank,
    },
    investments: {
      title: "Investments",
      icon: faMoneyBillTrendUp,
    },
    credit: {
      title: "Credit",
      icon: undefined,
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEditMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateWealth = async (event: any) => {
    if (event.key === "Enter") {
      if (amount === wealth?.category[props.type].value) return;
      const data = { [props.type]: amount };
      const updatedData = await patchWealth(data);
      setWealth(updatedData);
      toggleEditMode();
    }
  };

  return (
    <div className="moneyCard">
      <div className="description">
        <div className="text">
          <span className="title">{details[props.type].title}</span>
          <span>{wealth?.category[props.type].percentage}%</span>
        </div>
        <div className="design">
          <FontAwesomeIcon
            icon={details[props.type].icon}
            className="icon icon--large"
          />
        </div>
      </div>
      <div className="amount">
        {editMode ? (
          <input
            type="number"
            className="editField"
            ref={inputRef}
            autoFocus
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            onKeyDown={updateWealth}
          />
        ) : (
          <div className="currentAmount">
            <span>{wealth?.category[props.type].value} EUR </span>
            <FontAwesomeIcon
              icon={faPencil}
              className="editIcon"
              onClick={toggleEditMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyCard;
