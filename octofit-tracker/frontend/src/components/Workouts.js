import React, { useEffect, useState } from 'react';

function baseUrl(component) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${component}/`;
  }
  return `http://127.0.0.1:8000/api/${component}/`;
}

export default function Workouts() {
  const [data, setData] = useState([]);
  const endpoint = baseUrl('workouts');

  useEffect(() => {
    console.log('Fetching Workouts from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Workouts response:', json);
        const list = Array.isArray(json) ? json : (json.results || json.workouts || []);
        setData(list);
      })
      .catch(err => console.error('Workouts fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {data.length === 0 && <li className="list-group-item">No workouts</li>}
        {data.map((item, idx) => (
          <li key={idx} className="list-group-item">{item.name || JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
