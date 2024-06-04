"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FindReportsResponse } from "../interfaces/findReports/reports-response.interface";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  reports: FindReportsResponse[];
}

const ConsumoTXChart = ({ reports }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Carga de bateria",
      },
    },
  };

  const labels = reports.map((report) => {
    const time = moment.utc(report.fecha_registro).format("HH:mm");
    return time;
  });
  const data = {
    labels,
    datasets: [
      {
        label: "cBat",
        data: reports.map((report) => report.cBat),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} className="w-full" />;
};

export default ConsumoTXChart;
