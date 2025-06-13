// src/pages/AnalyticsPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAnalytics } from '../services/api'; // assumes updated function to accept userId
import AnalyticsModal from '../components/AnalyticsModal';
import { useAuth } from '../context/AuthContext'; 

export default function AnalyticsPage() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetchAnalytics(code, user.id);
        setData(res.data);
      } catch (err) {
        console.error("Error loading analytics:", err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An unexpected error occurred while fetching analytics.");
        }
      }
    };

    loadAnalytics();
  }, [code, user.id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          ← Back
        </button>
        <div className="p-6 bg-white rounded-xl shadow-md text-red-600 font-medium border border-red-300">
          ❌ {error}
        </div>
      </div>
    );
  }

  if (!data) return <div className="p-4 text-gray-600">Loading analytics...</div>;
    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>
      <AnalyticsModal data={data} onClose={() => navigate(-1)} />
    </div>
  );
}
