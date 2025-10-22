import { useSearchParams, Link } from "react-router-dom";

export default function Detail() {
  const [params] = useSearchParams();
  const fruit = params.get("fruit") || "Unknown";

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <div className="mb-4">
        <Link to="/select" className="text-blue-600">
          ← กลับไปเลือกผลไม้
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{fruit}</h1>

      <img
        src={`/images/${fruit.toLowerCase()}.jpg`}
        alt={fruit}
        className="w-full max-w-xl rounded-xl mb-6"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Real-time Graph</h2>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            (ใส่กราฟจริงภายหลัง)
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">ระดับความสุก</h2>
          <p>Ripe: ~28%</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">เวลาเก็บรักษาที่เหลือ</h2>
          <p>3 days</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">เหมาะสำหรับ</h2>
          <p>กินสด / ทำสมูทตี้</p>
        </div>
      </div>
    </div>
  );
}
