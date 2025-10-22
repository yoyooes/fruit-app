import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <img src="/images/header.jpg" alt="header" className="w-full max-w-3xl rounded-xl" />
      <Link to="/select" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
        Start
      </Link>
    </div>
  );
}
