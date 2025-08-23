import { Link, Routes, Route } from "react-router-dom";
import DashboardProperties from "./DashboardProperties";
import DashboardClients from "./DashboardClients";
import DashboardViewings from "./DashboardViewings";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, padding: 20, background: "#f5f5f5" }}>
        <nav>
          <p><Link to="properties">Properties</Link></p>
          <p><Link to="clients">Clients</Link></p>
          <p><Link to="viewings">Viewings</Link></p>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 20 }}>
        <Routes>
          <Route path="properties" element={<DashboardProperties />} />
          <Route path="clients" element={<DashboardClients />} />
          <Route path="viewings" element={<DashboardViewings />} />
        </Routes>
      </main>
    </div>
  );
}
