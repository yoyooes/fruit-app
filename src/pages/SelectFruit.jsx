import { Link } from "react-router-dom";

export default function SelectFruit() {
  const fruits = ["Banana", "Durian", "Mango"];
  return (
    <div className="min-h-screen flex flex-col items-center py-12 gap-4">
      <h1 className="text-3xl font-bold">เลือกผลไม้</h1>
      <div className="flex flex-col gap-3">
        {fruits.map((f) => (
          <Link
            key={f}
            to={`/detail?fruit=${encodeURIComponent(f)}`}
            className="px-5 py-3 border rounded-lg hover:bg-gray-50 text-center"
          >
            {f}
          </Link>
        ))}
      </div>
    </div>
  );
}
