import { useState, useEffect } from 'react';
import UrlList from '../components/UrlList';
import { fetchUrlsByTag } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [selectedTag, setSelectedTag] = useState('marketing');
    const navigate  = useNavigate();
  const loadUrls = async () => {
    const res = await fetchUrlsByTag(selectedTag);
    setUrls(res.data.urls);
  };
  const handleClickUrl = () => {
    
     navigate('/shorten');
  }

  useEffect(() => { loadUrls(); }, [selectedTag]);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">URL Shortener Dashboard</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClickUrl}>Short any Url here</button>
      <select onChange={e => setSelectedTag(e.target.value)} value={selectedTag} className="p-2 border rounded">
        <option value="marketing">Marketing</option>
        <option value="social">Social</option>
        {/* Add more if needed */}
      </select>
      <UrlList urls={urls} />
    </div>
  );
}
