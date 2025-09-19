import React, { useState } from "react";

const FlipCard = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // Images for A–Z & 0–9
  const images = {
    A: "/signs/A.png", B: "/signs/B.png", C: "/signs/C.png", D: "/signs/D.png",
    E: "/signs/E.png", F: "/signs/F.png", G: "/signs/G.png", H: "/signs/H.png",
    I: "/signs/I.png", J: "/signs/J.png", K: "/signs/K.png", L: "/signs/L.png",
    M: "/signs/M.png", N: "/signs/N.png", O: "/signs/O.png", P: "/signs/P.png",
    Q: "/signs/Q.png", R: "/signs/R.png", S: "/signs/S.png", T: "/signs/T.png",
    U: "/signs/U.png", V: "/signs/V.png", W: "/signs/W.png", X: "/signs/X.png",
    Y: "/signs/Y.png", Z: "/signs/Z.png",
    "0": "/signs/0.png", "1": "/signs/1.png", "2": "/signs/2.png", "3": "/signs/3.png",
    "4": "/signs/4.png", "5": "/signs/5.png", "6": "/signs/6.png", "7": "/signs/7.png",
    "8": "/signs/8.png", "9": "/signs/9.png"
  };

  // Audio for A–Z & 0–9
  const audioFiles = {
    A: "/audio/A.mp3", B: "/audio/B.mp3", C: "/audio/C.mp3", D: "/audio/D.mp3",
    E: "/audio/E.mp3", F: "/audio/F.mp3", G: "/audio/G.mp3", H: "/audio/H.mp3",
    I: "/audio/I.mp3", J: "/audio/J.mp3", K: "/audio/K.mp3", L: "/audio/L.mp3",
    M: "/audio/M.mp3", N: "/audio/N.mp3", O: "/audio/O.mp3", P: "/audio/P.mp3",
    Q: "/audio/Q.mp3", R: "/audio/R.mp3", S: "/audio/S.mp3", T: "/audio/T.mp3",
    U: "/audio/U.mp3", V: "/audio/V.mp3", W: "/audio/W.mp3", X: "/audio/X.mp3",
    Y: "/audio/Y.mp3", Z: "/audio/Z.mp3",
    "0": "/audio/0.mp3", "1": "/audio/1.mp3", "2": "/audio/2.mp3", "3": "/audio/3.mp3",
    "4": "/audio/4.mp3", "5": "/audio/5.mp3", "6": "/audio/6.mp3", "7": "/audio/7.mp3",
    "8": "/audio/8.mp3", "9": "/audio/9.mp3"
  };

  const handleShowImage = () => {
    const char = input.toUpperCase();
    if (images[char]) {
      setImage(images[char]);
      setFlipped(false);
      setShowCard(true);
    } else {
      alert("Please enter a valid letter (A-Z) or number (0-9).");
      setShowCard(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    const char = input.toUpperCase();
    if (audioFiles[char]) {
      new Audio(audioFiles[char]).play();
    }
  };

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
        <source src="/video/m.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[-1]" />

      {/* Content */}
      <div className="flex flex-col items-center px-6 text-center">
        <h2 className="mb-6 text-4xl font-extrabold drop-shadow-lg">
          Sign Language Flip Card
        </h2>

        {/* Show Card */}
        {showCard && (
          <div className="flex flex-col items-center mb-8 space-y-4">
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
                    src={image}
                    alt="Card Front"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Back */}
                <div className="absolute flex items-center justify-center w-full h-full font-bold text-white bg-yellow-900 rounded-lg shadow-xl text-8xl rotate-y-180 backface-hidden">
                  {input.toUpperCase()}
                </div>
              </div>
            </div>
            <button
              onClick={handleFlip}
              className="px-6 py-2 text-white transition-transform bg-green-900 rounded-lg shadow-lg hover:bg-green-600 hover:scale-105"
            >
              Flip & Play Audio
            </button>
          </div>
        )}

        {/* Input */}
        <div className="flex p-4 space-x-3 shadow-lg bg-white/90 backdrop-blur-md rounded-xl">
          <input
            type="text"
            maxLength={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter A-Z or 0-9"
            className="px-3 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleShowImage}
            className="px-6 py-2 text-white transition-transform bg-blue-900 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105"
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
