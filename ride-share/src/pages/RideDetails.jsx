import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookRide } from "../store/rideSlice";
import toast from "react-hot-toast";
import { 
  MapPin, 
  ArrowRight, 
  Clock, 
  Users, 
  Car, 
  FileText, 
  User, 
  GraduationCap, 
  Phone,
  CheckCircle
} from "lucide-react";

const RideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ride = useSelector((state) =>
    state.rides.rides.find((r) => r.id === id),
  );
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  // Find driver info to display profile
  const driverProfile = useSelector((state) =>
    state.user.users.find((u) => u.id === ride?.driverId),
  );

  if (!ride)
    return <p className="text-center text-xl mt-10 text-gray-600">Ride not found.</p>;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a ride.", { id: 'login-required' });
      navigate("/login");
      return;
    }
    dispatch(bookRide({ rideId: ride.id, userId: currentUser.id }));
    toast.success("Ride booked successfully!", { 
      icon: '🎉',
      id: 'book-success' 
    });
    navigate("/my-bookings"); // Redirect after booking
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-10">
      <div className="border-b pb-6 mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900 mb-4">
          <MapPin className="text-blue-600" size={32} />
          Ride Details
        </h1>
        <p className="flex items-center gap-3 text-xl text-gray-700 font-medium">
          {ride.pickup} 
          <ArrowRight className="text-blue-500" size={24} />
          {ride.destination}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Trip Info</h2>
          <p className="flex items-center gap-2 text-gray-700">
            <Clock size={18} className="text-gray-400" />
            <strong>Departure Time:</strong> {ride.time}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Users size={18} className="text-gray-400" />
            <strong>Available Seats:</strong>{" "}
            <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
              {ride.seats}
            </span>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Car size={18} className="text-gray-400" />
            <strong>Vehicle:</strong> {ride.vehicle}
          </p>
          <p className="flex items-start gap-2 text-gray-700">
            <FileText size={18} className="text-gray-400 mt-1 shrink-0" />
            <span><strong>Notes:</strong> {ride.notes}</span>
          </p>
        </div>

        {/* Driver Profile card */}
        <div className="bg-gray-50 p-5 rounded-lg space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Driver Profile
          </h2>
          <p className="flex items-center gap-2 text-gray-700">
            <User size={18} className="text-gray-400" />
            <strong>Name:</strong>{" "}
            <Link
              to={`/profile/${ride.driverId}`}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition"
            >
              {driverProfile?.name || ride.driverName}
            </Link>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <GraduationCap size={18} className="text-gray-400" />
            <strong>Major:</strong> {driverProfile?.major || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Phone size={18} className="text-gray-400" />
            <strong>Contact:</strong>{" "}
            {isAuthenticated ? (
              <span className="text-gray-800">{ride.contact}</span>
            ) : (
              <span className="text-gray-500 italic text-sm">Log in to view</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex justify-end">
        <button
          onClick={handleBooking}
          disabled={ride.seats === 0}
          className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${
            ride.seats > 0 
              ? "bg-blue-600 hover:bg-blue-700 hover:shadow-md" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {ride.seats > 0 ? (
            <>
              <CheckCircle size={20} />
              Book a Seat
            </>
          ) : (
            "Ride Full"
          )}
        </button>
      </div>
    </div>
  );
};

export default RideDetails;