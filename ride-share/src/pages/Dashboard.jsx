import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Car, MapPin, CalendarCheck, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const { rides, bookings } = useSelector(state => state.rides);

  // Calculate user-specific stats
  const myBookedRides = bookings.filter(b => b.userId === currentUser.id);
  const myOfferedRides = rides.filter(r => r.driverId === currentUser.id);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-blue-600 text-white p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h1>
          <p className="text-blue-100">Here is a quick overview of your campus transportation.</p>
        </div>
        <div className="bg-blue-700 px-6 py-3 rounded-lg text-center">
          <p className="text-sm text-blue-200 uppercase tracking-wider font-semibold">Major</p>
          <p className="font-bold text-lg">{currentUser.major || 'Not specified'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookings Stat Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <CalendarCheck size={32} />
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Rides Booked</p>
            <p className="text-3xl font-bold text-gray-800">{myBookedRides.length}</p>
          </div>
        </div>

        {/* Offered Rides Stat Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <Car size={32} />
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Rides Offered</p>
            <p className="text-3xl font-bold text-gray-800">{myOfferedRides.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/rides" className="flex items-center justify-center gap-2 bg-white border-2 border-blue-100 hover:border-blue-600 text-blue-700 p-4 rounded-lg font-semibold transition group">
            <MapPin className="group-hover:scale-110 transition-transform" size={20} />
            Find a Ride
          </Link>
          
          <Link to="/post-ride" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition group">
            <PlusCircle className="group-hover:scale-110 transition-transform" size={20} />
            Offer a Ride
          </Link>

          <Link to="/my-bookings" className="flex items-center justify-center gap-2 bg-white border-2 border-green-100 hover:border-green-600 text-green-700 p-4 rounded-lg font-semibold transition group">
            <CalendarCheck className="group-hover:scale-110 transition-transform" size={20} />
            View Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;