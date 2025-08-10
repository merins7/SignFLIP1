import { Link } from "react-router-dom";

export default function TopRightNav({ links }) {
  return (
    <div className="absolute top-4 right-4 flex gap-4">
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className="bg-[#f0f0f0] text-black px-4 py-2 rounded-lg border border-gray-400 hover:bg-[#e0e0e0] transform hover:scale-[1.15] transition duration-200"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
