import  { Link } from "react-router-dom";

export default function home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <h4 className="text-4xl font-bold mb-4">Welcome to Sign Language Learning </h4>
      <h4 className="text-3xl font-bold mb-8">SignFLIP </h4>
      <div className="flex flex-row gap-8 ">
        <Link to="/" className="w-[150px] bg-[#f0f0f0] py-3 rounded-lg text-center text-lg border border-gray-400 hover:bg-[#e0e0e0] transform hover:scale-[1.35] transition duration-200">
          Home
        </Link>
        <Link to="/flashcards" className="w-[150px] bg-[#f0f0f0] py-3 rounded-lg text-center text-lg border border-gray-400 hover:bg-[#e0e0e0] transform hover:scale-[1.35] transition duration-200">
          Flash Cards
        </Link>
        <Link to="/quiz" className="w-[150px] bg-[#f0f0f0] py-3 rounded-lg text-center text-lg border border-gray-400 hover:bg-[#e0e0e0] transform hover:scale-[1.35] transition duration-200">
          Quiz
        </Link>
        <Link to="/settings" className="w-[150px] bg-[#f0f0f0] py-3 rounded-lg text-center text-lg border border-gray-400 hover:bg-[#e0e0e0] transform hover:scale-[1.35] transition duration-200">
          Settings
        </Link>
      </div>
    </div>
    );}
        