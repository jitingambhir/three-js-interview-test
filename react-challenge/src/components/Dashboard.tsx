import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.scss";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface Attribute {
  name: string;
  value: number;
  unit: string;
}

interface Item {
  title: string;
  attributes: Attribute[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItemIndex(Number(e.target.value));
  };

  const currentItem = data[currentItemIndex];

  if (!currentItem) return <p>Loading...</p>;

  const chartData = {
    labels: currentItem.attributes.map((attr) => attr.name),
    datasets: [
      {
        label: "Value",
        data: currentItem.attributes.map((attr) => attr.value),
        backgroundColor: "rgba(9, 122, 192, 1)",
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      <h1>{currentItem.title}</h1>
      <div className={styles.content}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.attributes.map((attr) => (
              <tr key={attr.name}>
                <td>{attr.name}</td>
                <td>
                  {attr.value} {attr.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.chart}>
          <Bar data={chartData} />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={data.length - 1}
        value={currentItemIndex}
        onChange={handleRangeChange}
        className={styles.rangeInput}
      />
    </div>
  );
};

export default Dashboard;
