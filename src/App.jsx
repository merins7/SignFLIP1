import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlashCards from "./pages/FlashCards";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar"; // ✅ import Navbar

export default function App() {
  return (
    <Router>
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
