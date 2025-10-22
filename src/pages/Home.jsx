// src/pages/Home.jsx
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <img src="/assets/header.jpg" alt="header" className="w-full rounded-xl mb-4" />
      <h1 className="text-2xl font-bold mb-2">Fruit Ripeness Project</h1>
      <p className="text-slate-600">
        ระบบวัดความสุกแบบเรียลไทม์ด้วย ESP32 + WebSocket พร้อมคำแนะนำการบริโภค
      </p>
    </div>
  );
}
