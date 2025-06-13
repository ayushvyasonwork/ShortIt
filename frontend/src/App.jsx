import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UrlForm from './pages/UrlForm';
import AnalyticsModal from './components/AnalyticsModal';

function App() {
  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 py-6'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shorten" element={<UrlForm />} />
          <Route path="/analytics" element={<AnalyticsModal />} />
        </Routes>
      </main>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-6">
          <Link to="/" className="text-gray-800 font-semibold hover:text-blue-600">Dashboard</Link>
          <Link to="/shorten" className="text-gray-800 font-semibold hover:text-blue-600">Shorten</Link>
          <Link to="/analytics" className="text-gray-800 font-semibold hover:text-blue-600">Analytics</Link>
        </div>
      </div>
    </nav>
  );
}

export default App;
