import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./TransactionsTable.js";
import Statistics from "./Statistics.js";
import BarChart from "./BarChart.js";

const Dashboard = () => {
  const [month, setMonth] = useState(3); // Default to March
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions",
        {
          params: { month, page },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/statistics", {
        params: { month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/bar-chart", {
        params: { month },
      });
      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [month, search, page]);

  return (
    <div>
      <h1>Dashboard</h1>
      <select
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value, 10))}
      >
        {Array.from({ length: 12 }, (v, k) => k + 1).map((m) => (
          <option key={m} value={m}>
            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Statistics statistics={statistics} />
      <TransactionsTable
        transactions={transactions}
        onNext={() => setPage(page + 1)}
        onPrevious={() => setPage(Math.max(page - 1, 1))}
      />
      <BarChart data={barChartData} />
    </div>
  );
};

export default Dashboard;
