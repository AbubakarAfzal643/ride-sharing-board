import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelBooking } from '../store/rideSlice'; // We will create this next!
import toast from 'react-hot-toast';
import { 
  CalendarDays, 
  MapPin, 
  ArrowRight, 
  Clock, 
  User, 
  Phone, 
  Car, 
  Trash2, 
  SearchX,
  CheckCircle2
} from 'lucide-react';

const MyBookings = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const { rides, bookings } = useSelector(state => state.rides);
  const dispatch = useDispatch();

  // 1. Find all booking records for this user
  const userBookings = bookings.filter(b => b.userId === currentUser.id);

  // 2. Map those booking records to the actual ride details
  const bookedRides = userBookings.map(booking => {
    const rideDetails = rides.find(r => r.id === booking.rideId);
    return { ...rideDetails, bookingId: booking.id };
  }).filter(ride => ride.id !== undefined); // filter out any undefined just in case

  const handleCancelBooking = (bookingId, rideId) => {
    // Adding a native confirmation dialog just to be safe
    if (window.confirm("Are you sure you want to cancel this ride?")) {
      dispatch(cancelBooking({ bookingId, rideId }));
      toast.success("Booking cancelled. Your seat has been restored.", {
        icon: '🗑️',
        id: 'cancel-success'
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto mt-6">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
          <CalendarDays size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
      </div>
      
      {bookedRides.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border border-dashed border-gray-300 text-center flex flex-col items-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <SearchX size={48} className="text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg mb-6 font-medium">You haven't booked any rides yet.</p>
          <Link to="/rides" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
            Find a Ride
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookedRides.map(ride => (
            <div key={ride.bookingId} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="flex items-center gap-2 font-bold text-xl text-gray-900 flex-wrap">
                  {ride.pickup} 
                  <ArrowRight size={18} className="text-blue-500 shrink-0" /> 
                  {ride.destination}
                </h3>
                <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2.5 py-1.5 rounded font-bold shrink-0">
                  <CheckCircle2 size={14} />
                  Confirmed
                </span>
              </div>
              
              <div className="space-y-3 text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-100">
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <strong>Departure:</strong> {ride.time}
                </p>
                <p className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <strong>Driver:</strong> {ride.driverName}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <strong>Contact:</strong> {ride.contact}
                </p>
                <p className="flex items-center gap-2">
                  <Car size={16} className="text-gray-400" />
                  <strong>Vehicle:</strong> {ride.vehicle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <Link to={`/rides/${ride.id}`} className="text-blue-600 hover:text-blue-800 font-semibold transition">
                  View Full Details →
                </Link>
                
                <button 
                  onClick={() => handleCancelBooking(ride.bookingId, ride.id)}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition font-medium text-sm"
                >
                  <Trash2 size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;