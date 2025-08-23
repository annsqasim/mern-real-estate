import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TestPage from "./pages/testpage";
import PropertyList from "./pages/propertyList";
import PropertyDetail from "./pages/propertydetail";
import CreateProperty from "./pages/createproperty";
import Dashboard from "./pages/Dashboard";
import DashboardProperties from "./pages/DashboardProperties";
import DashboardClients from "./pages/DashboardClients";
import DashboardViewings from "./pages/DashboardViewings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="properties" element={<DashboardProperties />} />
          <Route path="clients" element={<DashboardClients />} />
          <Route path="viewings" element={<DashboardViewings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
