import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import { 
  Car, 
  Search, 
  PlusCircle, 
  Calendar, 
  User, 
  Key, 
  LogOut, 
  LogIn, 
  UserPlus 
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate('/login'); 
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight hover:text-blue-200 transition">
          <Car size={28} />
          CampusRides
        </Link>
        <div className="flex gap-4 items-center text-sm md:text-base">
          <Link to="/rides" className="flex items-center gap-1 hover:text-blue-200 font-medium transition">
            <Search size={18} />
            Find Rides
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/post-ride" className="flex items-center gap-1 hover:text-blue-200 font-medium transition">
                <PlusCircle size={18} />
                Post Ride
              </Link>
              <Link to="/my-bookings" className="flex items-center gap-1 hover:text-blue-200 font-medium transition">
                <Calendar size={18} />
                My Bookings
              </Link>
              <div className="flex items-center gap-3 ml-2 border-l border-blue-400 pl-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 p-1.5 rounded-full">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm leading-tight">{currentUser.name}</span>
                    <Link to="/change-password" className="flex items-center gap-1 text-xs text-blue-200 hover:text-white transition mt-0.5">
                      <Key size={12} />
                      Change Password
                    </Link>
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-1 bg-red-500 px-3 py-1.5 rounded font-bold hover:bg-red-600 transition shadow-sm ml-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 ml-2 border-l border-blue-400 pl-4">
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-200 font-medium transition">
                <LogIn size={18} />
                Login
              </Link>
              <Link to="/register" className="flex items-center gap-1 bg-white text-blue-600 px-4 py-1.5 rounded font-bold hover:bg-gray-100 transition shadow-sm">
                <UserPlus size={18} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;