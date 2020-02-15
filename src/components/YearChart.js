import React from 'react';
import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Chart } from "react-google-charts";
import 'react-calendar-heatmap/dist/styles.css';

function YearChart() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/year-sales")
      .then(res => res.json())
      .then(result => setItems(result))
  }, []);

  return (
    <div>
      <div>
        <CalendarHeatmap
          startDate={new Date('2019-01-01')}
          endDate={new Date('2019-12-31')}
          gutterSize={0}
          values={items.map((item) => {
            return {
              'date': item.date,
              'count': item.count
            }})}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
        />
      </div>
    </div>
  );
}

export default YearChart;