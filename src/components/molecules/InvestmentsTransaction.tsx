import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Dropdown from "../atoms/Dropdown";
import { TransactionSource } from "../../types/database";
import styles from "../../styles/organisms/TransactionDetails.module.scss"

function InvestmentsTransaction() {
  const [sources, setSources] = useState([
    { label: "Wallet", value: TransactionSource.Income },
    { label: "Savings", value: TransactionSource.Savings },
  ]);
  const [source, setSource] = useState(null);
  const [selectedOption, setSelectedOption] = useState("deposit");

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className={styles["radio-buttons"]}>
        <label>
          <input
            type="radio"
            value="deposit"
            checked={selectedOption === "deposit"}
            onChange={handleOptionChange}
          />
          Deposit
        </label>
        <label>
          <input
            type="radio"
            value="withdrawal"
            checked={selectedOption === "withdrawal"}
            onChange={handleOptionChange}
          />
          Withdrawal
        </label>
        <label>
          <input
            type="radio"
            value="loss"
            checked={selectedOption === "loss"}
            onChange={handleOptionChange}
          />
          Loss
        </label>
      </div>
      <div className={styles["modal-field"] + ' ' + (selectedOption !== "deposit" ? styles["disabled"]: "")}>
        <FontAwesomeIcon icon={faArrowUpFromBracket} className={styles["icon"]} />
        <Dropdown
          isSearchable
          placeholder="Select Source"
          options={sources}
          groups={false}
          onChange={(option: any) => {
            setSource(option);
          }}
        />
      </div>
    </>
  );
}

export default InvestmentsTransaction;
