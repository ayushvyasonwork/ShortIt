import { useState } from 'react';
import { fetchAnalytics } from '../services/api';
import AnalyticsModal from './AnalyticsModal';

export default function UrlItem({ url }) {
  const [analytics, setAnalytics] = useState(null);

  const handleViewAnalytics = async () => {
    const res = await fetchAnalytics(url.shortCode);
    setAnalytics(res.data);
  };

  return (
    <div className="border p-3 rounded shadow mb-2">
      <p><strong>Short URL:</strong> <a href={url.shortUrl} target="_blank" rel="noreferrer">{url.shortUrl}</a></p>
      <p><strong>Original:</strong> {url.originalUrl}</p>
      <p><strong>Visits:</strong> {url.totalVisits} | <strong>Unique:</strong> {url.uniqueVisitors}</p>
      <p><strong>Tags:</strong> {url.tags.join(', ')}</p>
      <button onClick={handleViewAnalytics} className="mt-2 text-blue-600">View Analytics</button>
      {analytics && <AnalyticsModal data={analytics} onClose={() => setAnalytics(null)} />}
    </div>
  );
}
