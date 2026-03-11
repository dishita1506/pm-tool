import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;
    setStrength(score);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkStrength(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password))
      return toast.error(
        "Password must contain uppercase, lowercase, number & special character",
      );
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    const result = await dispatch(register({ name, email, password }));
    if (result.error) {
      toast.error(result.error.message || "Registration failed");
    } else {
      toast.success("✅ Account created! Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Create Account
        </h2>

        {/* Name & Email fields same as before */}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-4 border dark:border-gray-700 rounded-2xl mb-6 bg-transparent focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-4 border dark:border-gray-700 rounded-2xl mb-6 bg-transparent focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="w-full p-4 border dark:border-gray-700 rounded-2xl mb-2 bg-transparent focus:outline-none focus:border-blue-500"
          required
        />

        {/* Strength Bar */}
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
          <div
            className={`h-full transition-all ${
              strength === 5
                ? "bg-emerald-500"
                : strength >= 3
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-4 border dark:border-gray-700 rounded-2xl mb-8 bg-transparent focus:outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-3xl font-semibold"
        >
          Create Account
        </button>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
