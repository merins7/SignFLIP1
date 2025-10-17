import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

// Lightweight MediaPipe Hands via CDN script injection
const HANDS_JS = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.min.js";
const CAMERA_JS = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";
const DRAW_JS = "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js";

export default function Live() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [gesture, setGesture] = useState("Idle");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const lastSpeakRef = useRef(0);
  const voiceEnabledRef = useRef(true);
  const maybeSpeak = maybeSpeakFactory(voiceEnabledRef, lastSpeakRef);

  // Simple live tracking with Open/Pinch feedback only

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      await ensureScript(HANDS_JS);
      await ensureScript(CAMERA_JS);
      await ensureScript(DRAW_JS);
      if (!cancelled) setReady(true);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || !running) return;
    let hands, camera;
    const init = async () => {
      // globals from scripts
      // eslint-disable-next-line no-undef
      hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
      hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });
      hands.onResults(onResults);

      // eslint-disable-next-line no-undef
      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    };

    const onResults = (results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      if (results.multiHandLandmarks && results.multiHandLandmarks.length) {
        // eslint-disable-next-line no-undef
        const { drawConnectors, drawLandmarks, HAND_CONNECTIONS } = window;
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#22d3ee', lineWidth: 4 });
          drawLandmarks(ctx, landmarks, { color: '#f59e0b', lineWidth: 2 });
          detectSimpleGesture(landmarks);
        }
      } else {
        setGesture("No hand");
      }
      ctx.restore();
    };

    init();
    return () => {
      try { camera && camera.stop && camera.stop(); } catch {}
    };
  }, [ready, running]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  const detectSimpleGesture = (landmarks) => {
    // Heuristics:
    // - Pinch: thumb-index distance small
    // - Fist: few or no extended fingers
    // - Open: many extended fingers
    const thumb = landmarks[4];
    const index = landmarks[8];
    const middle = landmarks[12];
    const ring = landmarks[16];
    const pinky = landmarks[20];
    const indexPip = landmarks[6];
    const middlePip = landmarks[10];
    const ringPip = landmarks[14];
    const pinkyPip = landmarks[18];
    if (!thumb || !index || !indexPip || !middle || !middlePip || !ring || !ringPip || !pinky || !pinkyPip) return;

    const pinchDist = Math.hypot(thumb.x - index.x, thumb.y - index.y);
    const isPinch = pinchDist < 0.06;

    // Extended if tip is above (smaller y) than pip in image coordinates
    const indexExt = index.y < indexPip.y;
    const middleExt = middle.y < middlePip.y;
    const ringExt = ring.y < ringPip.y;
    const pinkyExt = pinky.y < pinkyPip.y;
    const extendedCount = [indexExt, middleExt, ringExt, pinkyExt].filter(Boolean).length;

    let label = 'Open';
    if (isPinch) label = 'Pinch';
    else if (extendedCount <= 1) label = 'Fist';
    else if (extendedCount >= 3) label = 'Open';
    else label = 'Partial';

    if (label !== gesture) {
      setGesture(label);
      maybeSpeak(label);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-12">
        <h1 className="mb-4 text-3xl font-bold">Live Hand Tracking</h1>
        <div className="flex gap-3 mb-4">
          <button disabled={!ready || running} onClick={() => setRunning(true)} className={`px-4 py-2 rounded-lg ${running ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-500'}`}>Start</button>
          <button disabled={!running} onClick={() => setRunning(false)} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500">Stop</button>
          <div className="px-4 py-2 rounded-lg bg-white/10">Status: {ready ? (running ? 'Running' : 'Ready') : 'Loading...'}</div>
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 cursor-pointer">
            <input type="checkbox" checked={voiceEnabled} onChange={() => setVoiceEnabled(!voiceEnabled)} /> Voice
          </label>
        </div>
        <div className="w-full max-w-3xl aspect-video relative rounded-2xl overflow-hidden shadow-2xl bg-black/50">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted></video>
          <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full"></canvas>
        </div>
        <div className="mt-4 text-lg">Gesture: <span className="font-bold text-yellow-300">{gesture}</span></div>
      </div>
    </div>
  );
}

function ensureScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src; s.async = true; s.onload = () => resolve(); s.onerror = () => resolve();
    document.head.appendChild(s);
  });
}

function speak(text) {
  try {
    const synth = window.speechSynthesis; if (!synth) return;
    const u = new SpeechSynthesisUtterance(text); u.rate = 1; u.pitch = 1;
    synth.cancel(); synth.speak(u);
  } catch {}
}

function maybeSpeakFactory(voiceEnabledRef, lastSpeakRef) {
  return (text) => {
    const now = Date.now();
    if (!voiceEnabledRef.current) return;
    if (now - lastSpeakRef.current < 800) return; // throttle TTS
    lastSpeakRef.current = now;
    speak(text);
  };
}

function startCountdown(seconds, onTick, onDone) {
  let s = seconds;
  onTick(s);
  const id = setInterval(() => {
    s -= 1;
    if (s <= 0) {
      clearInterval(id);
      onTick(0);
      onDone();
    } else {
      onTick(s);
    }
  }, 1000);
}

// Hook into component scope functions by attaching to window
// This keeps file self-contained without external state libs
function startPractice() {}


