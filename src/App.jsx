import { useState, useEffect } from 'react';

// --- CONFIG ---
const WS_URL = "ws://192.168.1.75:81/stream"; // เปลี่ยนเป็น IP ของ ESP32
const BANNER_URL = "https://images.unsplash.com/photo-1574226516831-e1dff420e12e"; // รูปหัวเว็บ
const MEASUREMENT_SECONDS = 600; // 10 นาที

// เกณฑ์ผลไม้
const FRUIT_MODELS = {
  banana: {
    name: "Banana",
    adc_min: 700,
    adc_max: 3200,
    storage: "3 DAYS",
    bestFor: "Eating fresh or making smoothies",
    nutrition: "Rich in potassium, vitamin B6, and fiber",
    notes: "Avoid direct sunlight, store at room temperature",
  },
  durian: {
    name: "Durian",
    adc_min: 600,
    adc_max: 3400,
    storage: "2 DAYS",
    bestFor: "Eating ripe, creamy pulp",
    nutrition: "High in carbohydrates, healthy fats, and vitamin C",
    notes: "Keep in cool, dry place to slow ripening",
  },
  mango: {
    name: "Mango",
    adc_min: 800,
    adc_max: 3500,
    storage: "5 DAYS",
    bestFor: "Eating fresh or making desserts",
    nutrition: "Rich in vitamin A, vitamin C, and antioxidants",
    notes: "Store in ventilated area, avoid stacking",
  }
};

// --- APP COMPONENT ---
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [data, setData] = useState([]);
  const [ripeness, setRipeness] = useState(null);
  const [timeLeft, setTimeLeft] = useState(MEASUREMENT_SECONDS);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (page === 'dashboard') {
      const ws = new WebSocket(WS_URL);
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setData((prev) => [...prev.slice(-99), msg]);
      };
      return () => ws.close();
    }
  }, [page]);

  useEffect(() => {
    if (page === 'dashboard' && !finished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setFinished(true);
      calculateRipeness();
    }
  }, [page, timeLeft]);

  function calculateRipeness() {
    if (!data.length || !selectedFruit) return;
    const { adc_min, adc_max } = FRUIT_MODELS[selectedFruit];
    const avg = data.reduce((a, b) => a + b.adc, 0) / data.length;
    const pct = Math.min(100, Math.max(0, ((avg - adc_min) / (adc_max - adc_min)) * 100));
    setRipeness(pct);
  }

  // --- UI ---
  if (page === 'home') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-white text-center">
        <img src={BANNER_URL} alt="banner" className="w-full h-60 object-cover shadow-md mb-8" />
        <h1 className="text-4xl font-bold text-yellow-800 mb-10">Fruit Ripeness Analyzer</h1>
        <button onClick={() => setPage('select')} className="px-6 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow">
          Start
        </button>
      </div>
    );
  }

  if (page === 'select') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <h2 className="text-3xl font-semibold mb-6 text-green-800">Select Fruit Type</h2>
        {Object.keys(FRUIT_MODELS).map((key) => (
          <button
            key={key}
            onClick={() => { setSelectedFruit(key); setPage('dashboard'); }}
            className="px-6 py-3 my-2 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow"
          >
            {FRUIT_MODELS[key].name}
          </button>
        ))}
      </div>
    );
  }

  if (page === 'dashboard' && selectedFruit) {
    const model = FRUIT_MODELS[selectedFruit];
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <img src={BANNER_URL} alt="banner" className="w-full h-40 object-cover rounded-xl shadow mb-4" />
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-4">{model.name} — Real-Time Analysis</h2>

        {/* กราฟ */}
        <div className="w-full h-48 bg-white border rounded-lg shadow mb-6 p-2">
          {data.length ? (
            <svg className="w-full h-full">
              <polyline
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                points={data.map((d, i) => `${i * 3},${100 - (d.adc % 100)}`).join(' ')}
              />
            </svg>
          ) : (
            <p className="text-center text-gray-500 mt-16">Waiting for data…</p>
          )}
        </div>

        {/* ผลลัพธ์ */}
        {!finished ? (
          <div className="text-center text-gray-700">
            <p className="text-xl mb-2 font-medium">Please wait…</p>
            <p>Remaining time: {timeLeft}s</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 text-center text-gray-800">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-xl font-semibold text-green-700">Ripeness Score</h3>
              <p className="text-3xl font-bold text-green-600">{ripeness.toFixed(1)}%</p>
              <p className="text-sm mt-1">(0 = Raw, 100 = Rotten)</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-xl font-semibold text-yellow-700">Storage Time</h3>
              <p className="text-lg">{model.storage}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-xl font-semibold text-blue-700">Best For</h3>
              <p>{model.bestFor}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-xl font-semibold text-orange-700">Nutrition & Benefits</h3>
              <p>{model.nutrition}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
              <h3 className="text-xl font-semibold text-red-700">Notes</h3>
              <p>{model.notes}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
