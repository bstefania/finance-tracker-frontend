import { useEffect, useState } from "react";
import { TransactionType } from "../../types/database";
import Chart from "react-apexcharts";

import Dropdown, { Option } from "./Dropdown";
import { Amounts, getAmounts } from "../../api/transactions";
import { Notification, showNotification } from "../../utils/errorHandling";
import styles from "../../styles/molecules/MonthlyTransactions.module.scss";
import NoData from "../atoms/NoData";
import { getOptions } from "../../utils/charts/donut";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { transactionsActions } from "../../store/transactionsSlice";

type MonthlyTransactionsProps = {
  type?: TransactionType;
};

type LoadedTypes = {
  [key in TransactionType]: {
    loaded: boolean;
    amounts: Amounts;
  };
};

const availableTypes = [
  { label: "Expenses", value: TransactionType.Expense },
  { label: "Income", value: TransactionType.Income },
  { label: "Savings", value: TransactionType.Savings },
  { label: "Investments", value: TransactionType.Investments },
];

const initialLoadedTypes: LoadedTypes = availableTypes.reduce((acc, type) => {
  acc[type.value] = {
    loaded: false,
    amounts: {},
  };
  return acc;
}, {} as LoadedTypes);

function MonthlyTransactions({ type }: MonthlyTransactionsProps) {
  const dispatch = useAppDispatch();
  const updateTransactions = useAppSelector((state) => state.transactions.updateMonthlyTransactions);
  const [loadedTypes, setLoadedTypes] = useState<LoadedTypes>(initialLoadedTypes);
  const [changeData, setChangeData] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState(type ?? availableTypes[0].value);

  const [series, setSeries] = useState<number[]>([]); // amounts
  const [labels, setLabels] = useState<string[]>([]); // categories
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (!loadedTypes[selectedType].loaded) {
      fetchData(selectedType);
    } else {
      setChangeData(true);
    }
  }, [selectedType]);

  useEffect(() => {
    if (changeData) {
      constructChartData(loadedTypes[selectedType].amounts);
      setChangeData(false);
    }
  }, [changeData]);

  useEffect(() => {
    if (!updateTransactions) return;

    setLoadedTypes(initialLoadedTypes);
    fetchData(selectedType);
    dispatch(transactionsActions.clearUpdateMonthlyTransactions())
  }, [updateTransactions])

  const fetchData = async (type: TransactionType) => {
    getAmounts(type)
      .then((data: Amounts) => {
        setLoadedTypes((prevState) => ({
          ...prevState,
          [type]: {
            loaded: true,
            amounts: data,
          },
        }));
        setChangeData(true);
      })
      .catch((error: any) => {
        showNotification(error.message, Notification.ERROR);
      });
  };

  const changeType = (option: Option) => {
    setSelectedType(option.value as TransactionType);
  };

  const constructChartData = (data: Amounts) => {
    const seriesArr: number[] = [];
    const labelsArr: string[] = [];
    const colorsArr: string[] = [];

    Object.entries(data).forEach(([categoryGroup, categories]) => {
      Object.entries(categories).forEach(([category, values]) => {
        seriesArr.push(values.amount);
        labelsArr.push(category);
        colorsArr.push(values.color);
      });
    });

    setSeries(seriesArr);
    setColors(colorsArr);
    setLabels(labelsArr);
  };

  

  return (
    <div className={`${styles["widget"]} ${styles["monthly-expenses"]}`}>
      <div className={styles["header"]}>
        <h2>Monthly transactions</h2>
      </div>
      <div className={styles["donut"]}>
        <div className={styles["filters"]}>
          <div className={styles["filter"]}>
            <Dropdown
              options={availableTypes}
              placeholder=""
              onChange={(option) => {
                changeType(option as Option);
              }}
            />
          </div>
        </div>
        {series.length > 0 ? (
          <Chart options={getOptions(colors, labels)} series={series} type="donut" width="100%" />
        ) : (
          <NoData
            isLoading={false}
            loadingText="Fetching transactions..."
            notFoundText="No transactions found in the current month"
          />
        )}
      </div>
    </div>
  );
}

export default MonthlyTransactions;
