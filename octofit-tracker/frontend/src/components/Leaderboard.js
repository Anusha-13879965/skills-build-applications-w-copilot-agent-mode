import React, { useEffect, useState } from 'react';

function baseUrl(component) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${component}/`;
  }
  return `http://127.0.0.1:8000/api/${component}/`;
}

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const endpoint = baseUrl('leaderboard');

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Leaderboard response:', json);
        const list = Array.isArray(json) ? json : (json.results || json.leaderboard || []);
        setData(list);
      })
      .catch(err => console.error('Leaderboard fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {data.length === 0 && <li className="list-group-item">No leaderboard data</li>}
        {data.map((item, idx) => (
          <li key={idx} className="list-group-item">{(item.team && item.points) ? `${item.team}: ${item.points}` : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
