import { useState, useEffect } from 'react';

import {
  fetchAllAnalytics,
  fetchAnalytics,
  fetchUrlsByTag
} from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UrlItem from '../components/UrlItem'; // Assuming you have a UrlItem component to display each URL

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [searchCode, setSearchCode] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
console.log("Loading all URLs for user:", user.id);
  const loadAllUrls = async () => {
    try {
        
      const res = await fetchAllAnalytics(user.id);
      setUrls(res.data);
    } catch (err) {
      console.error("Error loading all analytics", err);
    }
  };

  const handleSearchByCode = async () => {
    if (!searchCode.trim()) return loadAllUrls();
    try {
      const res = await fetchAnalytics(searchCode.trim(),user.id);
      setUrls([res.data]);
    } catch (err) {
      console.error("Search by code failed", err);
      setUrls([]);
    }
  };

  const handleSearchByTag = async () => {
    if (!searchTag.trim()) return loadAllUrls();
    try {
      const res = await fetchUrlsByTag(searchTag.trim());
      setUrls(res.data.urls);
    } catch (err) {
      console.error("Tag search failed", err);
      setUrls([]);
    }
  };

  const handleClickUrl = () => navigate('/shorten');
  console.log("User in Dashboard:", user);
  useEffect(() => {
    if (user?.id) loadAllUrls();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">URL Shortener Dashboard</h1>

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search by Code */}
        <input
          type="text"
          placeholder="Search by Short Code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearchByCode}
        >
          Search Code
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search by Tag */}
        <input
          type="text"
          placeholder="Search by Tag"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={handleSearchByTag}
        >
          Search Tag
        </button>
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleClickUrl}
      >
        Short any URL here
      </button>

      <div className="mt-4">
      {urls.map(url => <UrlItem key={url.shortCode} url={url} />)}
    </div>
    </div>
  );
}
