import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 shadow-sm h-16 fixed w-full z-50 flex items-center px-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
          P
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          PM Tool
        </h1>
      </div>

      <div className="ml-12 flex items-center gap-8">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <button
          onClick={toggleDarkMode}
          className="text-2xl hover:scale-110 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-900 px-5 py-2 rounded-3xl border dark:border-gray-700">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-2xl flex items-center justify-center font-bold">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950 px-5 py-2.5 rounded-2xl font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
