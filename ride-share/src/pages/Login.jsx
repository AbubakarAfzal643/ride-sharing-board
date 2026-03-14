import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/userSlice";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, AlertCircle, UserCheck } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      toast.success("Welcome to your dashboard!", {
        icon: "👋",
        id: "welcome-toast",
      });

      navigate("/dashboard");
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    dispatch(login({ email, password }));

    timeoutRef.current = setTimeout(() => {
      const errorMsg =
        "Invalid email or password.";
      setError(errorMsg);
      toast.error("Login failed. Check your credentials.", {
        id: "error-toast",
      });
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-600">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full mb-3 text-blue-600">
          <UserCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <AlertCircle size={20} className="shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
            <Mail size={16} />
            Campus Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="student@campus.edu"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
            <Lock size={16} />
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center gap-2 w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded hover:bg-blue-700 transition mt-6 shadow-md"
        >
          <LogIn size={20} />
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-800 font-semibold transition"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
