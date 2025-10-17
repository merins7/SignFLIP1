import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Learn() {
  const lessons = [
    { id: "again", title: "AGAIN", mediaType: "video", src: "/video/again.mp4", caption: "Repeat or again.", audio: "/audio/again.mp4" },
    { id: "bye", title: "BYE", mediaType: "video", src: "/video/bye.mp4", caption: "Goodbye gesture.", audio: "/audio/bye.mp4" },
    { id: "deaf", title: "DEAF", mediaType: "video", src: "/video/deaf.mp4", caption: "Sign for deaf.", audio: "/audio/deaf.mp4" },
    { id: "hello-my-name-is", title: "HELLO MY NAME IS", mediaType: "video", src: "/video/hello my name is.mp4", caption: "Introduce yourself.", audio: "/audio/hello my name is.mp4" },
    { id: "hello", title: "HELLO", mediaType: "video", src: "/video/hello.mp4", caption: "Wave hand near head.", audio: "/audio/hello.mp3" },
    { id: "home", title: "HOME", mediaType: "video", src: "/video/home.mp4", caption: "Home sign.", audio: null },
    { id: "homes", title: "HOMES", mediaType: "video", src: "/video/homes.mp4", caption: "Homes scene.", audio: null },
    { id: "how", title: "HOW", mediaType: "video", src: "/video/how.mp4", caption: "How gesture.", audio: "/audio/how.mp4" },
    { id: "idu", title: "I DONT UNDERSTAND", mediaType: "video", src: "/video/idu.mp4", caption: "I don't understand.", audio: "/audio/i dont understand.mp4" },
    { id: "ilu", title: "I LOVE YOU", mediaType: "video", src: "/video/ilu.mp4", caption: "I love you sign.", audio: "/audio/i love you.mp4" },
    { id: "m", title: "M", mediaType: "video", src: "/video/m.mp4", caption: "Letter M motion.", audio: null },
    { id: "my", title: "MY", mediaType: "video", src: "/video/my.mp4", caption: "My sign.", audio: "/audio/my.mp4" },
    { id: "nice-to-meet-you", title: "NICE TO MEET YOU", mediaType: "video", src: "/video/nice to meet you.mp4", caption: "Greeting phrase.", audio: "/audio/nice to meet you.mp4" },
    { id: "no", title: "NO", mediaType: "video", src: "/video/no.mp4", caption: "No gesture.", audio: "/audio/no.mp4" },
    { id: "ntmu", title: "NICE TO MEET YOU (SHORT)", mediaType: "video", src: "/video/ntmu.mp4", caption: "Abbreviated phrase.", audio: "/audio/nice to meet you, goodbye.mp4" },
    { id: "please", title: "PLEASE", mediaType: "video", src: "/video/please.mp4", caption: "Please gesture.", audio: "/audio/please.mp4" },
    { id: "same", title: "SAME", mediaType: "video", src: "/video/same.mp4", caption: "Same gesture.", audio: "/audio/same.mp4" },
    { id: "slow", title: "SLOW", mediaType: "video", src: "/video/slow.mp4", caption: "Slow gesture.", audio: "/audio/slow.mp4" },
    { id: "thankyou", title: "THANK YOU", mediaType: "video", src: "/video/thankyou.mp4", caption: "Thank you gesture.", audio: "/audio/thank you.mp4" },
    { id: "vid", title: "VIDEO", mediaType: "video", src: "/video/vid.mp4", caption: "Sample video.", audio: null },
    { id: "where", title: "WHERE", mediaType: "video", src: "/video/where.mp4", caption: "Where gesture.", audio: "/audio/where.mp4" },
    { id: "who", title: "WHO", mediaType: "video", src: "/video/who.mp4", caption: "Who gesture.", audio: "/audio/who.mp4" },
    { id: "yes", title: "YES", mediaType: "video", src: "/video/yes.mp4", caption: "Yes gesture.", audio: "/audio/yes.mp4" },
    { id: "you", title: "YOU", mediaType: "video", src: "/video/you.mp4", caption: "You gesture.", audio: "/audio/you.mp4" },
  ];

  // Input-first flow; no carousel/random navigation

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      {/* Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/video/homes.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-[-1]" />

      <div className="relative z-10 flex flex-col items-center px-4 pt-24 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-4xl font-extrabold tracking-wide"
        >
          Learn Videos & Sentences
        </motion.h1>
        {/* Type to Learn */}
        <div className="w-full max-w-6xl p-6 mt-4 shadow-2xl bg-white/10 rounded-3xl backdrop-blur-md">
          <h3 className="mb-4 text-2xl font-bold">Type to Learn</h3>
          <TypeToLearn lessons={lessons} />
        </div>
      </div>
    </div>
  );
}


function speak(text) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    synth.cancel();
    synth.speak(utter);
  } catch {}
}

function TypeToLearn({ lessons = [] }) {
  const [text, setText] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [images, setImages] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [isPlayingLetters, setIsPlayingLetters] = useState(false);

  const mapCharToAsset = (ch) => {
    const upper = ch.toUpperCase();
    if (upper >= "A" && upper <= "Z") return `/signs/${upper}.png`;
    if (upper >= "0" && upper <= "9") return `/signs/${upper}.png`;
    return null;
  };

  const handleGenerate = () => {
    const chars = text.split("");
    const mapped = chars
      .map((c, idx) => ({ c, src: mapCharToAsset(c), key: `${c}-${idx}` }))
      .filter((x) => x.src);
    setImages(mapped);
    setFlipped(false);
    if (text.trim()) speak(text);
  };

  const stopAllAudio = () => {
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {}
    setIsPlayingLetters(false);
    setPlayingIndex(-1);
  };

  const playLettersSequentially = async () => {
    if (!images.length) return;
    stopAllAudio();
    setIsPlayingLetters(true);
    const delays = [];
    for (let i = 0; i < images.length; i++) {
      const ch = images[i].c.toUpperCase();
      const audioPath = (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') ? `/audio/${ch}.mp3` : null;
      if (!audioPath) continue;
      setPlayingIndex(i);
      try {
        // eslint-disable-next-line no-await-in-loop
        await playOnce(audioPath);
      } catch {}
      delays.push(null);
    }
    setPlayingIndex(-1);
    setIsPlayingLetters(false);
  };

  const playOnce = (src) => new Promise((resolve) => {
    try {
      const a = new Audio(src);
      a.onended = () => resolve();
      a.onerror = () => resolve();
      a.play().catch(() => resolve());
    } catch {
      resolve();
    }
  });

  const matchingLesson = (() => {
    const t = text.trim().toLowerCase();
    if (!t) return null;
    return lessons.find(
      (l) => l.title.toLowerCase() === t || l.id.toLowerCase() === t
    );
  })();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type any word or sentence"
          className="flex-1 px-4 py-3 text-black rounded-lg"
        />
        <button onClick={handleGenerate} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500">Generate</button>
      </div>

      {matchingLesson && (
        <motion.div
          key={matchingLesson.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto mt-4 overflow-hidden bg-black shadow-2xl rounded-2xl"
        >
          {matchingLesson.mediaType === 'gif' ? (
            <img src={matchingLesson.src} alt={matchingLesson.title} className="object-contain w-full h-[40vh]" />
          ) : matchingLesson.src.endsWith('.glb') ? (
            <div className="w-full h-[40vh] bg-gray-900 flex items-center justify-center">
              <p className="text-white">3D Model: {matchingLesson.title}</p>
            </div>
          ) : (
            <video 
              src={matchingLesson.src} 
              controls 
              className="object-contain w-full h-[40vh]"
              onPlay={() => {
                if (matchingLesson.audio) {
                  const audio = new Audio(matchingLesson.audio);
                  audio.play().catch(() => {});
                }
              }}
            />
          )}
          {matchingLesson.audio && (
            <div className="p-3 bg-black/50">
              <h3 className="text-lg font-bold text-white">{matchingLesson.title}</h3>
              <p className="text-white/80 text-sm">{matchingLesson.caption}</p>
              <p className="mt-1 text-xs text-blue-300">💡 Audio plays automatically with video</p>
            </div>
          )}
        </motion.div>
      )}

      <div className="relative mt-6 w-full h-[40vh] md:h-[50vh] perspective">
        <div
          className={`absolute inset-0 transition-transform duration-700 ${flipped ? "rotate-y-180" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front: text animated */}
          <div className="absolute inset-0 flex items-center justify-center backface-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-400">
            <motion.div
              key={text}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="px-6 text-4xl font-extrabold text-center md:text-5xl"
            >
              {text || "Type something to generate"}
            </motion.div>
          </div>

          {/* Back: letter images strip */}
          <div className="absolute inset-0 p-3 overflow-hidden rotate-y-180 backface-hidden rounded-2xl bg-black/30">
            <div className="grid h-full grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
              {images.length === 0 ? (
                <div className="flex items-center justify-center col-span-full text-white/80">
                  No mappable letters yet
                </div>
              ) : (
                images.map((img, idx) => (
                  <motion.img
                    key={img.key}
                    src={img.src}
                    alt={img.c}
                    className={`w-full h-full object-cover rounded-lg shadow ${idx === playingIndex ? 'ring-4 ring-yellow-300 animate-pulse' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button onClick={() => setFlipped(!flipped)} className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-500">Flip</button>
          <button onClick={() => speak(text)} className="px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30">Speak Text</button>
          <button onClick={playLettersSequentially} disabled={!images.length || isPlayingLetters} className={`px-6 py-3 rounded-lg ${isPlayingLetters ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-500'} `}>Play Letters</button>
          <button onClick={stopAllAudio} className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-500">Stop</button>
        </div>
      </div>
    </div>
  );
}


