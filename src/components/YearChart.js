import React from 'react';
import { useState, useEffect } from 'react';

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
        {items.map((home, index) => <p key={index}>{home.date} {home.count} {home.sum}</p>)}
      </div>
    </div>
  );
}

export default YearChart;