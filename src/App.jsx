import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlashCards from "./pages/FlashCards";

import Quiz from "./pages/Quiz";

import Navbar from "./components/Navbar"; // ✅ import Navbar
import Learn from "./pages/Learn";
import Live from "./pages/Live";

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
        <Route path="/learn" element={<Learn />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Router>
  );
}
