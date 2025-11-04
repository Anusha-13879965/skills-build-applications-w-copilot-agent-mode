import React, { useEffect, useState } from 'react';

function baseUrl(component) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${component}/`;
  }
  // fallback to local Django dev server
  return `http://127.0.0.1:8000/api/${component}/`;
}

export default function Activities() {
  const [data, setData] = useState([]);
  const endpoint = baseUrl('activities');

  useEffect(() => {
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Activities response:', json);
        const list = Array.isArray(json) ? json : (json.results || json.activities || []);
        setData(list);
      })
      .catch(err => console.error('Activities fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <pre style={{display: 'none'}}>{JSON.stringify(data, null, 2)}</pre>
      <ul className="list-group">
        {data.length === 0 && <li className="list-group-item">No activities</li>}
        {data.map((item, idx) => (
          <li key={idx} className="list-group-item">{item.type || item.name || JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
