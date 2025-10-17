import React, { useState } from "react";
import { motion } from "framer-motion";

const FlashcardApp = () => {
  const [input, setInput] = useState("");
  const [card, setCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  // ASL letters & numbers
  const asl = {
    A: { image: "/signs/A.png", audio: "/audio/A.mp3" },
    B: { image: "/signs/B.png", audio: "/audio/B.mp3" },
    C: { image: "/signs/C.png", audio: "/audio/C.mp3" },
    D: { image: "/signs/D.png", audio: "/audio/D.mp3" },
    E: { image: "/signs/E.png", audio: "/audio/E.mp3" },
    F: { image: "/signs/F.png", audio: "/audio/F.mp3" },
    G: { image: "/signs/G.png", audio: "/audio/G.mp3" },
    H: { image: "/signs/H.png", audio: "/audio/H.mp3" },
    I: { image: "/signs/I.png", audio: "/audio/I.mp3" },
    J: { image: "/signs/J.png", audio: "/audio/J.mp3" },
    K: { image: "/signs/K.png", audio: "/audio/K.mp3" },
    L: { image: "/signs/L.png", audio: "/audio/L.mp3" },
    M: { image: "/signs/M.png", audio: "/audio/M.mp3" },
    N: { image: "/signs/N.png", audio: "/audio/N.mp3" },
    O: { image: "/signs/O.png", audio: "/audio/O.mp3" },
    P: { image: "/signs/P.png", audio: "/audio/P.mp3" },
    Q: { image: "/signs/Q.png", audio: "/audio/Q.mp3" },
    R: { image: "/signs/R.png", audio: "/audio/R.mp3" },
    S: { image: "/signs/S.png", audio: "/audio/S.mp3" },
    T: { image: "/signs/T.png", audio: "/audio/T.mp3" },
    U: { image: "/signs/U.png", audio: "/audio/U.mp3" },
    V: { image: "/signs/V.png", audio: "/audio/V.mp3" },
    W: { image: "/signs/W.png", audio: "/audio/W.mp3" },
    X: { image: "/signs/X.png", audio: "/audio/X.mp3" },
    Y: { image: "/signs/Y.png", audio: "/audio/Y.mp3" },
    Z: { image: "/signs/Z.png", audio: "/audio/Z.mp3" },
    "0": { image: "/signs/0.png", audio: "/audio/0.mp3" },
    "1": { image: "/signs/1.png", audio: "/audio/1.mp3" },
    "2": { image: "/signs/2.png", audio: "/audio/2.mp3" },
    "3": { image: "/signs/3.png", audio: "/audio/3.mp3" },
    "4": { image: "/signs/4.png", audio: "/audio/4.mp3" },
    "5": { image: "/signs/5.png", audio: "/audio/5.mp3" },
    "6": { image: "/signs/6.png", audio: "/audio/6.mp3" },
    "7": { image: "/signs/7.png", audio: "/audio/7.mp3" },
    "8": { image: "/signs/8.png", audio: "/audio/8.mp3" },
    "9": { image: "/signs/9.png", audio: "/audio/9.mp3" },
  };

  // ASL-only mode (letters and numbers)

  const handleShowCard = () => {
    const val = input.toUpperCase().trim();
    if (asl[val]) {
      setCard({ type: "asl", value: val, ...asl[val] });
      setFlipped(false);
    } else {
      alert("Enter a valid ASL letter (A-Z) or number (0-9).");
      setCard(null);
    }
  };

  const handleFlip = () => {
    if (!card) return;
    setFlipped(!flipped);
    if (card?.audio) new Audio(card.audio).play();
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-[-1]" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center w-full h-full px-6 py-12 text-center text-white">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 text-5xl font-extrabold tracking-wide md:text-6xl drop-shadow-2xl"
        >
          Flashcard Learning <span className="text-pink-400">(ASL)</span>
        </motion.h1>


        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center w-full max-w-lg gap-4 mb-12 sm:flex-row"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Enter A-Z or 0-9"}
            className="flex-1 px-5 py-3 text-lg text-gray-900 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-400"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShowCard}
            className="px-8 py-3 text-lg font-semibold transition-all duration-300 bg-blue-700 rounded-lg shadow-lg hover:bg-blue-500"
          >
            Show
          </motion.button>
        </motion.div>

        {/* Flashcard */}
        {card && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px #facc15" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-[350px] h-[350px] cursor-pointer transition-transform duration-700 transform perspective"
              onClick={handleFlip}
            >
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-700 transform ${
                  flipped ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden bg-white shadow-2xl rounded-3xl backface-hidden">
                  <motion.img
                    key={card.image}
                    src={card.image}
                    alt={card.value}
                    className="object-cover w-full h-full"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Back - Animated Letter */}
                <div className="absolute inset-0 flex items-center justify-center w-full h-full rounded-3xl rotate-y-180 backface-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                 <motion.div
  key={card.value}
  initial={{ scale: 0, rotate: -180, opacity: 0 }}
  animate={{ scale: 1.3, rotate: 0, opacity: 1 }}
  transition={{
    type: "spring",
    stiffness: 250,
    damping: 12,
    duration: 0.6,
  }}
  className="font-extrabold text-white text-6xl drop-shadow-xl"
>
  {card.value}
</motion.div>

                </div>
              </div>
            </motion.div>

            {/* Flip Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFlip}
              className="px-10 py-4 text-lg font-semibold transition-all duration-300 bg-green-700 rounded-full shadow-lg hover:bg-green-600"
            >
              Flip & Play Audio
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlashcardApp;
