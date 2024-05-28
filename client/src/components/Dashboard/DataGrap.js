import React from "react";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

// Register necessary elements
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const DataGrap = ({ income, expenses }) => {
  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "# expenses",
        data: [expenses, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        height: "60%",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "40px",
      }}
    >
      <div>
        <h3>Transactions</h3>
      </div>
      <Pie data={data} />
    </div>
  );
};

export default DataGrap;
