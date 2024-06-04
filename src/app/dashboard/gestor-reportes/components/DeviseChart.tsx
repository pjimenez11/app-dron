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
  c: string[] | number[];
  v: string[] | number[];
  title: string;
  labelsDevise: string[];
}

const DeviseChart = ({ c, v, title, labelsDevise }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = labelsDevise;
  const data = {
    labels,
    datasets: [
      {
        label: "Corriente",
        data: c,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Voltaje",
        data: v,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} height={250} />;
};

export default DeviseChart;
