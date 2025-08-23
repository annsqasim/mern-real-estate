import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("/api/clients").then(r => setClients(r.data));
  }, []);

  return (
    <div>
      <h2>Client Inquiries</h2>
      {clients.map(c => (
        <div key={c._id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
          <p><strong>{c.name}</strong> ({c.email}) → {c.property?.title}</p>
          <p>{c.message}</p>
        </div>
      ))}
    </div>
  );
}
