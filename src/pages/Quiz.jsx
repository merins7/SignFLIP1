import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Generate ASL quiz questions dynamically (A-Z + 0-9)
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

// Combine letters and numbers
const aslItems = [...letters, ...numbers];

// Function to create random quiz questions
const generateQuiz = (numQuestions = 10) => {
  const shuffled = aslItems.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numQuestions);
  return selected.map((item) => ({
    question: "Which ASL sign does this represent?",
    image: `/signs/${item}.png`, // Make sure images are in public/signs/
    options: shuffleOptions(item),
    answer: item,
  }));
};

// Function to generate options (one correct + 3 random)
const shuffleOptions = (correct) => {
  let options = [correct];
  while (options.length < 4) {
    const randomItem =
      aslItems[Math.floor(Math.random() * aslItems.length)];
    if (!options.includes(randomItem)) options.push(randomItem);
  }
  return options.sort(() => 0.5 - Math.random());
};

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const progress = questions.length ? Math.round(((currentIndex) / questions.length) * 100) : 0;

  // Generate quiz on component mount
  useEffect(() => {
    setQuestions(generateQuiz(10)); // 10 random questions
  }, []);

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
    setQuestions(generateQuiz(10));
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  if (questions.length === 0) return null; // Wait until quiz is generated

  return (
    <div
      className="relative flex flex-col min-h-screen text-white"
      style={{
        backgroundImage: "url('/signs/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/60" />

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-start w-full px-6 py-20">
        <h1 className="mb-8 text-4xl font-bold text-center text-yellow-300 drop-shadow-lg">
          ASL Quiz Section
        </h1>

        {!showResult ? (
          <div className="w-full max-w-3xl p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-3xl border-white/20">
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-yellow-400" style={{ width: `${progress}%` }} />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-center">
              {questions[currentIndex].question}
            </h2>

            {/* ASL Sign Image */}
            <div className="flex justify-center mb-6">
              <div className="w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl bg-black shadow-2xl">
                <img
                  src={questions[currentIndex].image}
                  alt="ASL sign"
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {questions[currentIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-3 rounded-lg border font-medium transition ${
                    selectedOption === option
                      ? (option === questions[currentIndex].answer
                          ? "bg-green-600 text-white border-green-700 shadow-md"
                          : "bg-red-600 text-white border-red-700 shadow-md")
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
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  selectedOption
                    ? "bg-yellow-500 hover:bg-yellow-400 text-white shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md p-8 text-center border shadow-2xl bg-white/10 backdrop-blur-md rounded-3xl border-white/20">
            <h2 className="mb-4 text-2xl font-bold text-yellow-300">
              Quiz Completed 🎉
            </h2>
            <p className="mb-6 text-lg">
              You scored <span className="font-bold">{score}</span> out of{" "}
              {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
