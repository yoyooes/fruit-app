import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SelectFruit from "./pages/SelectFruit";
import Detail from "./pages/Detail";

export default function App() {
  return (
    <div className="app">
      {/* Nav แบบเรียบง่าย */}
      <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/select">Select Fruit</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<SelectFruit />} />
        {/* ลิงก์ลึกได้ตรงหน้า /detail/banana หรือ /detail/durian */}
        <Route path="/detail/:fruit" element={<Detail />} />
      </Routes>
    </div>
  );
}
