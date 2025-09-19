import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/video/home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[-1]" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-screen px-6 text-center text-white">
        <h4 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 animate-pulse drop-shadow-lg">
          Welcome to Sign Language Learning
        </h4>
        <h4 className="mb-12 text-4xl font-bold drop-shadow-lg">
          SignFLIP
        </h4>

        <div className="flex flex-row flex-wrap justify-center gap-8">
          <Link
            to="/"
            className="w-[150px] bg-white/90 text-black py-3 rounded-lg text-center text-lg font-semibold border border-gray-400 hover:bg-white transform hover:scale-110 transition duration-300 shadow-md"
          >
            Home
          </Link>
          <Link
            to="/flashcards"
            className="w-[150px] bg-white/90 text-black py-3 rounded-lg text-center text-lg font-semibold border border-gray-400 hover:bg-white transform hover:scale-110 transition duration-300 shadow-md"
          >
            Flash Cards
          </Link>
          <Link
            to="/quiz"
            className="w-[150px] bg-white/90 text-black py-3 rounded-lg text-center text-lg font-semibold border border-gray-400 hover:bg-white transform hover:scale-110 transition duration-300 shadow-md"
          >
            Quiz
          </Link>
          <Link
            to="/settings"
            className="w-[150px] bg-white/90 text-black py-3 rounded-lg text-center text-lg font-semibold border border-gray-400 hover:bg-white transform hover:scale-110 transition duration-300 shadow-md"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
