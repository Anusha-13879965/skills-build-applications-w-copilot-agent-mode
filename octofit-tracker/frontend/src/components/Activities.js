import React, { useEffect, useState, useCallback } from 'react';

function baseUrl(component) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${component}/`;
  }
  // fallback to local Django dev server
  return `http://127.0.0.1:8000/api/${component}/`;
}
function truncate(str, n = 80) {
  if (!str) return '';
  const s = typeof str === 'string' ? str : JSON.stringify(str);
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function Activities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const endpoint = baseUrl('activities');

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching Activities from', endpoint);
    return fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Activities response:', json);
        const list = Array.isArray(json) ? json : (json.results || json.activities || []);
        setData(list);
        setLoading(false);
      })
      .catch(err => {
        console.error('Activities fetch error', err);
        setError(String(err));
        setLoading(false);
      });
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Activities</h3>
        <div className="mb-2">
          <button className="btn btn-primary me-2" onClick={load}>Refresh</button>
          <a className="btn btn-link" href={endpoint} target="_blank" rel="noreferrer">API</a>
        </div>

        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Primary</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && !loading && (
                <tr><td colSpan="4">No activities</td></tr>
              )}
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.type || item.name || item.username || item.id}</td>
                  <td>{truncate(item.description || item.distance || item.duration || item)}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => { setSelected(item); setShowModal(true); }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && selected && (
          <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity Details</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body"><pre>{JSON.stringify(selected, null, 2)}</pre></div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
