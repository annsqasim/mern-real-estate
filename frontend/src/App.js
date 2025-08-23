import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./pages/testpage";
import PropertyList from "./pages/propertyList";
import PropertyDetail from "./pages/propertyDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
