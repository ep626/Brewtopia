import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BreweryBarChart = () => {
  // Initialize all categories with a count of zero
  const initialData = [
    { name: "micro", count: 0 },
    { name: "nano", count: 0 },
    { name: "regional", count: 0 },
    { name: "brewpub", count: 0 },
    { name: "large", count: 0 },
    { name: "planning", count: 0 },
    { name: "contract", count: 0 },
    { name: "proprietor", count: 0 },
    { name: "closed", count: 0 },
  ];

  const [breweryData, setBreweryData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      // Map through the initialData to fetch counts for each type
      const dataPromises = initialData.map(async (category) => {
        const response = await fetch(
          `https://api.openbrewerydb.org/breweries/meta?by_type=${category.name}`
        );
        const data = await response.json();
        return {
          name: category.name,
          count: parseInt(data.total, 10), // Parse the total as an integer
        };
      });

      // Resolve all promises and set the state
      Promise.all(dataPromises).then((dataForChart) => {
        setBreweryData(dataForChart);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <BarChart
        width={800}
        height={300}
        data={breweryData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />{" "}
        {/* Ensure all labels are shown */}
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" name="Total Types of Breweries" />
      </BarChart>
    </div>
  );
};

export default BreweryBarChart;
