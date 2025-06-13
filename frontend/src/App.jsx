import React from 'react';
import { Routes, Route, Link , useNavigate, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UrlForm from './pages/UrlForm';
import AnalyticsModal from './components/AnalyticsModal';
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register"
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          {/* Home Route: Conditional Redirect */}
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />

          {/* Protected Routes */}
          <Route path="/shorten" element={user ? <UrlForm /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={user ? <AnalyticsModal /> : <Navigate to="/login" />} />
          <Route path="/analytics/:code" element={<AnalyticsPage />} />


          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // from AuthContext
    localStorage.removeItem("token"); // remove token
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-6">
          <Link to="/" className="text-gray-800 font-semibold hover:text-blue-600">Dashboard</Link>
          <Link to="/shorten" className="text-gray-800 font-semibold hover:text-blue-600">Shorten</Link>

        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


export default App;
