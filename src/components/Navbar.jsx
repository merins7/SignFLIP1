import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Flash Cards", path: "/flashcards" },
   
    { name: "Quiz", path: "/quiz" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 backdrop-blur-md"
    >
      <div className="flex items-center justify-center gap-10 px-8 py-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative font-semibold text-lg transition duration-300 ${
              location.pathname === link.path
                ? "text-white"
                : "text-white/80 hover:text-white"
            }`}
          >
            {link.name}
            {/* underline animation */}
            {location.pathname === link.path && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-white"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
