import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TestPage from "./pages/testpage";
import PropertyList from "./pages/propertyList";
import PropertyDetail from "./pages/propertydetail";
import CreateProperty from "./pages/createproperty";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
