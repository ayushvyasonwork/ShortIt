import { useState } from 'react';
import { shortenUrl } from '../services/api';


export default function UrlForm() {
  const [form, setForm] = useState({ originalUrl: '', customCode: '', expiry: '', tags: '' });
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map(tag => tag.trim());
    const res = await shortenUrl({ ...form, tags: tagsArray });
    console.log('Shortened URL:', res.data);
    setUrl(res.data.shortUrl);
    setMsg(res.data.message);
    setForm({ originalUrl: '', customCode: '', expiry: '', tags: '' });
  };

  return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">🔗 URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original URL <span className="text-red-500">*</span></label>
            <input
              type="url"
              required
              placeholder="https://example.com"
              value={form.originalUrl}
              onChange={e => setForm({ ...form, originalUrl: e.target.value })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Code</label>
            <input
              placeholder="Optional: custom-code"
              value={form.customCode}
              onChange={e => setForm({ ...form, customCode: e.target.value })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="datetime-local"
              value={form.expiry}
              onChange={e => setForm({ ...form, expiry: e.target.value })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              placeholder="marketing, social"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
          >
            🚀 Shorten URL
          </button>
        </form>

        {msg && <p className="text-green-600 text-center font-medium">{msg}</p>}

        {url && (
          <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200 text-center">
            <p className="text-gray-800">
              <strong>Shortened URL:</strong>{' '}
              <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {url}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
