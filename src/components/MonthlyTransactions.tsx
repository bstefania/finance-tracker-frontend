import React from "react";
import "../styles/MonthlyExpenses.scss";
import { TransactionType } from "../types/database";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { euro } from "../utils/numberFormat";

type MonthlyTransactionsProps = {
  type?: TransactionType;
};

function MonthlyTransactions({ type }: MonthlyTransactionsProps) {
  const series = [55, 20, 1, 30, 4, 33, 43];
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["A", "B", "C", "D","E", "F", "G"],
    colors: ["#008082", "#008d7c", "#1b986e", "#48a259", "#72a93f", "#9ead20", "#cdad00", "#ffa600"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#808080"],
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
        opacity: 0.4,
        dropShadow: {
          enabled: false,
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val) {
          return euro.format(val)
        },
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px'
            },
            value: {
              show: true,
              fontSize: '20px',
              offsetY: -4,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Spent",
              color: "black",
              formatter: function(data) {
                const total = data.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b
                }, 0)
                return euro.format(total) 
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="monthlyExpenses">
      <div className="header">
        <h2>Monthly transactions</h2>
      </div>
      <div className="donut">
        <Chart
          options={options}
          series={series}
          type="donut"
          width="100%"
        />
      </div>
    </div>
  );
}

export default MonthlyTransactions;
