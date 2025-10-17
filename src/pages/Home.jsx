import { Link } from "react-router-dom";
import { BookOpen, HelpCircle, Home as HomeIcon, PlayCircle, Camera } from "lucide-react";

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
        <source src="/video/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-black/70 z-[-1]" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-screen px-6 space-y-16 text-center text-white">
        
        {/* Title Section */}
        <div>
          <h1 className="mb-6 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] animate-pulse">
            SignFlip ✨
          </h1>
          <h2 className="text-2xl font-semibold tracking-wide text-gray-200 sm:text-3xl animate-fadeIn">
             Learn ASL Alphabets, Numbers & Words</h2>
        </div>

        {/* Navigation Buttons in One Line */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { to: "/", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
            { to: "/flashcards", label: "Flash Cards", icon: <BookOpen className="w-6 h-6" /> },
            { to: "/learn", label: "Learn", icon: <PlayCircle className="w-6 h-6" /> },
            { to: "/live", label: "Live", icon: <Camera className="w-6 h-6" /> },
            { to: "/quiz", label: "Quiz", icon: <HelpCircle className="w-6 h-6" /> },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="flex items-center justify-center gap-3 px-6 py-4 w-[190px]
              rounded-2xl text-lg font-semibold 
              bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-lg
              hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] hover:bg-white/20 
              transition duration-300 ease-in-out"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
