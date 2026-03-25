import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AllRides from "./pages/AllRides";
import RideDetails from "./pages/RideDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostRide from "./pages/PostRide";
import MyBookings from "./pages/MyBookings";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-6xl w-full mx-auto p-4 mt-6">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/rides" element={<AllRides />} />
            <Route path="/rides/:id" element={<RideDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/post-ride"
              element={
                <ProtectedRoute>
                  <PostRide />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer className="text-center p-4 text-gray-500 text-sm mt-auto">
          &copy; {new Date().getFullYear()} Campus Rides. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
