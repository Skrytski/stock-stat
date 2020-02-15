import React from 'react';
import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Chart } from "react-google-charts";
import 'react-calendar-heatmap/dist/styles.css';

function YearChart() {
  const [items, setItems] = useState([]);

  const options = {
    title: "Age vs. Weight comparison",
    legend: "none"
  };

  const data = [
    [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
    [new Date(2013, 2, 4), 10],
    [new Date(2013, 2, 5), 3],
    [new Date(2013, 2, 7), -1],
    [new Date(2013, 2, 8), 2],
    [new Date(2013, 2, 12), -1],
    [new Date(2013, 2, 13), 1],
    [new Date(2013, 2, 15), 1],
    [new Date(2013, 2, 16), -4],
    [new Date(2013, 1, 4), 10],
    [new Date(2013, 1, 5), 3],
    [new Date(2013, 1, 7), -1],
    [new Date(2013, 1, 8), 2],
    [new Date(2013, 1, 12), -1],
    [new Date(2013, 1, 13), 1],
    [new Date(2013, 1, 15), 1],
    [new Date(2013, 1, 16), -4],
  ];

  const dataNew = (items) => {
    let newDate = []
    let type = [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
    newDate.push(type)
    items.map(item => newDate.push([new Date(item.date), item.count]))
    return newDate
  }


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
          gutterSize={0.5}
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
      <div>
        <div className={"my-pretty-chart-container"}>
          <Chart
            chartType="Calendar"
            data={dataNew(items)}
            options={options}
            width={1000}
            height="400px"
            legendToggle
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
      </div>
    </div>
  );
}

export default YearChart;