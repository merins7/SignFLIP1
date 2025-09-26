import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div
      className={`relative min-h-screen text-white ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-purple-600 via-pink-500 to-red-400"
      }`}
    >
      <Navbar />
      <div className="flex flex-col items-center px-6 pt-28">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>

        <div className="w-full max-w-xl p-6 space-y-6 shadow-lg bg-white/10 rounded-2xl">
          {/* Profile Section */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">Profile</h2>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Update Username"
                className="px-4 py-2 text-black rounded-lg"
              />
              <input
                type="email"
                placeholder="Update Email"
                className="px-4 py-2 text-black rounded-lg"
              />
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Save Profile
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">Change Password</h2>
            <div className="flex flex-col space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="px-4 py-2 text-black rounded-lg"
              />
              <input
                type="password"
                placeholder="New Password"
                className="px-4 py-2 text-black rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="px-4 py-2 text-black rounded-lg"
              />
              <button className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                Update Password
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">Preferences</h2>
            <div className="flex flex-col space-y-4">
              {/* Dark Mode Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="w-5 h-5"
                />
              </label>

              {/* Notifications Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span>Enable Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-4 border-t border-white/20">
            <button className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
