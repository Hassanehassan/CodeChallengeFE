import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
