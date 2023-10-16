import { useEffect, useState } from "react";
import { TransactionType } from "../../types/database";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { euro } from "../../utils/numberFormat";
import Dropdown, { Option } from "../atoms/Dropdown";
import { Amounts, getAmounts } from "../../api/transactions";
import { Notification, showNotification } from "../../utils/errorHandling";
import "../../styles/molecules/MonthlyTransactions.scss";

type MonthlyTransactionsProps = {
  type?: TransactionType;
};

function MonthlyTransactions({ type }: MonthlyTransactionsProps) {
  const availableTypes = [
    { label: "Expenses", value: TransactionType.Expense },
    { label: "Income", value: TransactionType.Income },
    { label: "Savings", value: TransactionType.Savings },
    { label: "Investments", value: TransactionType.Investments },
  ];
  const [selectedType, setSelectedType] = useState(
    type ?? availableTypes[0].value
  );
  const [series, setSeries] = useState<number[]>([]); // amounts
  const [labels, setLabels] = useState<string[]>([]); // categories
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const fetchData = async () => {
    getAmounts(selectedType)
      .then((data: Amounts) => {
        constructChartData(data);
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

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: colors,
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000"],
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
      },
      dropShadow: {
        enabled: false,
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.7,
        dropShadow: {
          enabled: false,
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return euro.format(val);
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
            },
            value: {
              show: true,
              fontSize: "20px",
              offsetY: -4,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Spent",
              color: "black",
              formatter: function (data) {
                const total = data.globals.seriesTotals.reduce(
                  (a: number, b: number) => {
                    return a + b;
                  },
                  0
                );
                return euro.format(total);
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="monthly-expenses">
      <div className="header">
        <h2>Monthly transactions</h2>
      </div>
      <div className="donut">
        <div className="filters">
          <div className="filter">
            <Dropdown
              options={availableTypes}
              placeholder=""
              onChange={(option) => {
                changeType(option as Option);
              }}
            />
          </div>
        </div>
        <Chart options={options} series={series} type="donut" width="100%" />
      </div>
    </div>
  );
}

export default MonthlyTransactions;
