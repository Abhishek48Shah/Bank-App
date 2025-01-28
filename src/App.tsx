import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/Auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminPannel from "./pages/AdminPannel";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpannel" element={<AdminPannel />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
