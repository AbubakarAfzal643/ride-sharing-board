import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, BookOpen, Mail, Car } from 'lucide-react';

const UserProfile = () => {
  const { userId } = useParams();
  
  // Find the specific user from our Redux store's mock database
  const profileUser = useSelector(state => 
    state.user.users.find(u => u.id === userId)
  );
  
  // Find all rides offered by this user
  const userRides = useSelector(state => 
    state.rides.rides.filter(r => r.driverId === userId)
  );

  if (!profileUser) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">User not found</h2>
        <Link to="/rides" className="text-blue-600 hover:underline mt-4 inline-block">Return to all rides</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-blue-100 p-6 rounded-full text-blue-600">
          <User size={64} />
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">{profileUser.name}</h1>
          
          <div className="flex flex-col md:flex-row gap-4 text-gray-600 mt-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <BookOpen size={18} className="text-blue-500" />
              <span>{profileUser.major || 'Major not specified'}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} className="text-blue-500" />
              <span>{profileUser.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rides Offered by this User */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Car className="text-blue-600" /> 
          Rides Offered by {profileUser.name.split(' ')[0]}
        </h2>
        
        {userRides.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500 border border-gray-200">
            This user hasn't offered any rides yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {userRides.map(ride => (
              <div key={ride.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{ride.pickup} → {ride.destination}</h3>
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-semibold">
                    {ride.seats} seats left
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">🕒 {ride.time}</p>
                
                <Link to={`/rides/${ride.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
                  View Ride Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;