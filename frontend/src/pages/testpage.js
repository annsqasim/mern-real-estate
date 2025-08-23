import { useState } from "react";
import axios from "axios";

export default function TestPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    try {
      const res = await axios.get("/api/properties"); // uses proxy
      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Backend Connection Test</h2>
      <button onClick={testAPI}>Test Backend</button>

      {data && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
