import React, { useState } from "react";

const FlashcardApp = () => {
  const [input, setInput] = useState("");
  const [card, setCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("asl"); // 'asl' or 'words'

  // ASL letters & numbers
  const asl = {
    A: { image: "/signs/A.png", audio: "/audio/A.mp3" },
    B: { image: "/signs/B.png", audio: "/audio/B.mp3" },
    C: { image: "/signs/C.png", audio: "/audio/C.mp3" },
    "1": { image: "/signs/1.png", audio: "/audio/1.mp3" },
    "2": { image: "/signs/2.png", audio: "/audio/2.mp3" },
    // Add all letters A-Z & numbers 0-9
  };

  // Word flashcards (all inside /signs folder)
  const words = {
    HELLO: { image: "/signs/hello.gif", audio: "/audio/hello.mp3" },
    LOVE: { image: "/signs/love.gif", audio: "/audio/love.mp3" },
    FRIEND: { image: "/signs/friend.gif", audio: "/audio/friend.mp3" },
    THANKYOU: { image: "/signs/thankyou.gif", audio: "/audio/thankyou.mp3" },
    SORRY: { image: "/signs/sorry.gif", audio: "/audio/sorry.mp3" },
    LEARN: { image: "/signs/learn.gif", audio: "/audio/learn.mp3" },
    SCHOOL: { image: "/signs/school.gif", audio: "/audio/school.mp3" },
    BOOK: { image: "/signs/book.gif", audio: "/audio/book.mp3" },
    MUSIC: { image: "/signs/music.gif", audio: "/audio/music.mp3" },
    COMPUTER: { image: "/signs/computer.gif", audio: "/audio/computer.mp3" },
  };

  const handleShowCard = () => {
    const val = input.toUpperCase().trim();
    if (mode === "asl" && asl[val]) {
      setCard({ type: "asl", value: val, ...asl[val] });
      setFlipped(false);
    } else if (mode === "words" && words[val]) {
      setCard({ type: "word", value: val, ...words[val] });
      setFlipped(false);
    } else {
      alert(
        mode === "asl"
          ? "Enter a valid ASL letter (A-Z) or number (0-9)."
          : "Enter a valid word (HELLO, LOVE, FRIEND, etc.)"
      );
      setCard(null);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    if (card?.audio) {
      new Audio(card.audio).play();
    }
  };

  const switchMode = () => {
    setMode(mode === "asl" ? "words" : "asl");
    setInput("");
    setCard(null);
    setFlipped(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/video/m.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[-1]" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-xl px-6 py-12 text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg">
          Flashcard Learning ({mode.toUpperCase()})
        </h1>

        {/* Switch Mode Button */}
        <button
          onClick={switchMode}
          className="px-6 py-2 mb-6 text-white transition bg-purple-600 rounded-lg hover:bg-purple-500"
        >
          {mode === "asl" ? "Switch to Words" : "Switch to ASL"}
        </button>

        {/* Input */}
        <div className="flex justify-center w-full mb-8 space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "asl"
                ? "Enter A-Z or 0-9"
                : "Enter a word (HELLO, LOVE, FRIEND, etc.)"
            }
            className="flex-1 px-4 py-2 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleShowCard}
            className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Show
          </button>
        </div>

        {/* Flashcard */}
        {card && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div
              className="w-[350px] h-[350px] cursor-pointer perspective"
              onClick={handleFlip}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform ${
                  flipped ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div className="absolute flex items-center justify-center w-full h-full overflow-hidden bg-white rounded-lg shadow-xl backface-hidden">
                  <img
                    src={card.image}
                    alt={card.value}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Back */}
                <div className="absolute flex items-center justify-center w-full h-full text-6xl font-bold text-white bg-yellow-900 rounded-lg shadow-xl backface-hidden rotate-y-180">
                  {card.value}
                </div>
              </div>
            </div>
            <button
              onClick={handleFlip}
              className="px-6 py-2 text-white transition bg-green-700 rounded-lg hover:bg-green-600"
            >
              Flip & Play Audio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardApp;
