import { useSearchParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { 
  Search, 
  MapPin, 
  Clock, 
  User, 
  Users, 
  ArrowRight, 
  Car, 
  SearchX 
} from "lucide-react";

const AllRides = () => {
  const rides = useSelector((state) => state.rides.rides);
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for the search inputs
  const [destination, setDestination] = useState(
    searchParams.get("destination") || "",
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination) {
      setSearchParams({ destination });
    } else {
      setSearchParams({});
    }
  };


  const filterParam = searchParams.get("destination")?.toLowerCase();
  const filteredRides = filterParam
    ? rides.filter((ride) =>
        ride.destination.toLowerCase().includes(filterParam),
      )
    : rides;

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
        <Car size={32} className="text-blue-600" />
        Available Rides
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <MapPin size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border p-2.5 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 transition font-medium"
        >
          <Search size={20} />
          Search
        </button>
      </form>

      {/* Ride List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white p-5 rounded-lg shadow border-t-4 border-blue-600 flex flex-col justify-between hover:shadow-md transition duration-200"
          >
            <div>
              <h3 className="flex items-center gap-2 font-bold text-lg text-gray-800 flex-wrap">
                {ride.pickup} 
                <ArrowRight size={16} className="text-blue-500 shrink-0" /> 
                {ride.destination}
              </h3>
              
              <div className="space-y-2 mt-4">
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} className="text-gray-400" /> 
                  {ride.time}
                </p>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <User size={16} className="text-gray-400" /> 
                  Driver: <span className="font-medium text-gray-700">{ride.driverName}</span>
                </p>
              </div>

              <div className="mt-4 items-center gap-1.5 flex bg-blue-50 text-blue-700 border border-blue-100 text-xs px-2.5 py-1 rounded-full font-medium">
                <Users size={14} />
                {ride.seats} {ride.seats === 1 ? 'seat' : 'seats'} left
              </div>
            </div>
            
            <Link
              to={`/rides/${ride.id}`}
              className="mt-6 block text-center bg-gray-50 text-gray-800 font-medium py-2 rounded border border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
            >
              View Details
            </Link>
          </div>
        ))}

        {filteredRides.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 py-16 px-4 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <SearchX size={48} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No rides found</h3>
            <p className="text-gray-500 max-w-sm">
              We couldn't find any rides matching your destination. Try searching for a different location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRides;