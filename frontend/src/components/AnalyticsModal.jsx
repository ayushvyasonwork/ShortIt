import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

import { Pie, Line } from 'react-chartjs-2';

export default function AnalyticsModal({ data, onClose }) {
  const pieData = {
    labels: Object.keys(data.deviceTypeBreakdown),
    datasets: [{ data: Object.values(data.deviceTypeBreakdown), backgroundColor: ['#f87171', '#60a5fa', '#34d399'] }]
  };

  const lineData = {
    labels: Object.keys(data.timeSeries),
    datasets: [{ label: 'Visits Over Time', data: Object.values(data.timeSeries), fill: false, borderColor: '#3b82f6' }]
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
      📊 Analytics for: <span className="text-blue-600">{data.shortCode}</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">📱 Device Type Breakdown</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <Pie data={pieData} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">📈 Time Series</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <Line data={lineData} />
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">🔗 Top Referrers</h3>
      <ul className="bg-gray-50 rounded-lg p-4 list-disc pl-6 space-y-1 text-gray-600">
        {data.referrers.map((r, idx) => (
          <li key={idx}>
            <span className="font-medium">{r.referrer}</span>: {r.count}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6 flex justify-end">
      <button
        onClick={onClose}
        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
      >
        Close
      </button>
    </div>
  </div>
</div>

  );
}
