import { useState } from "react";
import Navbar from "../components/Navbar";

// ASL Quiz Questions (A, B, numbers as example)
const questions = [
  {
    question: "Which letter does this ASL sign represent?",
    image: "/signs/A.png", // Make sure it's inside public/signs/
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    question: "Which letter does this ASL sign represent?",
    image: "/signs/B.png",
    options: ["X", "B", "M", "Z"],
    answer: "B",
  },
  {
    question: "Which number does this ASL sign represent?",
    image: "/signs/0.png",
    options: ["0", "5", "3", "8"],
    answer: "0",
  },
  {
    question: "Which number does this ASL sign represent?",
    image: "/signs/7.png",
    options: ["1", "4", "6", "7"],
    answer: "7",
  },
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentIndex].answer) {
        setScore(score + 1);
      }
      setSelectedOption(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      <Navbar />
      <div className="flex flex-col items-center px-6 pt-28">
        <h1 className="mb-6 text-3xl font-bold">ASL Quiz Section</h1>

        {!showResult ? (
          <div className="w-full max-w-xl p-6 shadow-lg bg-white/10 rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">
              {questions[currentIndex].question}
            </h2>

            {/* Show ASL image */}
            <div className="flex justify-center mb-6">
              <img
                src={questions[currentIndex].image}
                alt="ASL sign"
                className="object-contain w-40 h-40 bg-white rounded-lg shadow-md"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {questions[currentIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    selectedOption === option
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-white/20 text-white hover:bg-white/30 border-white/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedOption
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md p-6 text-center shadow-lg bg-white/10 rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold">Quiz Completed 🎉</h2>
            <p className="mb-4 text-lg">
              You scored <span className="font-bold">{score}</span> out of{" "}
              {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
