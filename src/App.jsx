import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlashCards from "./pages/FlashCards";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";


export default function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
    </Router>
  )
}

