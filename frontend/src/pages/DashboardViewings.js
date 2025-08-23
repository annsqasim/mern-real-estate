import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardViewings() {
  const [viewings, setViewings] = useState([]);
  const [form, setForm] = useState({ property: "", client: "", scheduledAt: "" });

  const load = () => {
    axios.get("/api/viewings").then(r => setViewings(r.data));
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await axios.post("/api/viewings", form);
    setForm({ property: "", client: "", scheduledAt: "" });
    load();
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`/api/viewings/${id}/status`, { status });
    load();
  };

  return (
    <div>
      <h2>Viewings</h2>

      <form onSubmit={create} style={{ display: "grid", gap: 8, maxWidth: 400 }}>
        <input placeholder="Property ID" value={form.property} onChange={e => setForm(f => ({...f, property:e.target.value}))} required />
        <input placeholder="Client ID" value={form.client} onChange={e => setForm(f => ({...f, client:e.target.value}))} required />
        <input type="datetime-local" value={form.scheduledAt} onChange={e => setForm(f => ({...f, scheduledAt:e.target.value}))} required />
        <button type="submit">Schedule Viewing</button>
      </form>

      <div style={{ marginTop: 20 }}>
        {viewings.map(v => (
          <div key={v._id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
            <p>
              {v.property?.title} with {v.client?.name} — {new Date(v.scheduledAt).toLocaleString()} — Status: {v.status}
            </p>
            <button onClick={() => updateStatus(v._id, "completed")}>Mark Completed</button>
            <button onClick={() => updateStatus(v._id, "no-show")}>Mark No-Show</button>
          </div>
        ))}
      </div>
    </div>
  );
}
