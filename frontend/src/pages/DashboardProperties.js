import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardProperties() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await axios.get("/api/properties?limit=100");
    setItems(res.data.data);
  };

  useEffect(() => { load(); }, []);

  const archive = async (id) => {
    await axios.patch(`/api/properties/${id}/archive`);
    load();
  };

  const remove = async (id) => {
    await axios.delete(`/api/properties/${id}`);
    load();
  };

  return (
    <div>
      <h2>Manage Properties</h2>
      {items.map(p => (
        <div key={p._id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
          <strong>{p.title}</strong> — {p.status}
          <button onClick={() => archive(p._id)} style={{ marginLeft: 10 }}>Archive</button>
          <button onClick={() => remove(p._id)} style={{ marginLeft: 10 }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
