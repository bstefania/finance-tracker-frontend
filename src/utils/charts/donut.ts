import { ron } from "../dataFormatter";
import { ApexOptions } from "apexcharts";

export const getOptions = (colors: string[], labels: string[]) => {
  return {
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
          return ron.format(val);
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
                const total = data.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
                return ron.format(total);
              },
            },
          },
        },
      },
    },
  } as ApexOptions;
};
