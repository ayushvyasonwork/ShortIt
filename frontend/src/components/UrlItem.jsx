import { useState } from 'react';
import { fetchAnalytics } from '../services/api';
import AnalyticsModal from './AnalyticsModal';
import { Link } from 'react-router-dom';
export default function UrlItem({ url }) {
  return (
    <div className="border p-3 rounded shadow mb-2">
      <p><strong>Short code:</strong>{url.shortCode}</p>
      <p><strong>Original:</strong> {url.originalUrl}</p>
      <p><strong>Visits:</strong> {url.totalVisits} | <strong>Unique:</strong> {url.uniqueVisitors}</p>
      <p><strong>Tags:</strong> {url.tags.join(', ')}</p>
      
      <Link
  to={`/analytics/${url.shortCode}`}
  className="text-sm text-blue-600 hover:underline"
>
  View Analytics
</Link>

    </div>
  );
}
