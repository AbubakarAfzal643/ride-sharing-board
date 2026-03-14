import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRide } from '../store/rideSlice';
import toast from 'react-hot-toast';
import { 
  PlusCircle, 
  MapPin, 
  Map, 
  Clock, 
  Users, 
  Car, 
  Phone, 
  FileText,
  CheckCircle
} from 'lucide-react';

const PostRide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);

  // Local state for the form fields
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    time: '',
    seats: 1,
    vehicle: '',
    contact: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'seats' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the action to Redux, attaching the driver's info from the logged-in user
    dispatch(addRide({
      ...formData,
      driverId: currentUser.id,
      driverName: currentUser.name
    }));

    toast.success('Ride posted successfully!', {
      icon: '🚀',
      id: 'post-success'
    });
    navigate('/rides'); // Redirect to all rides after posting
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-600">
      <div className="flex items-center gap-2 mb-8 border-b pb-4">
        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
          <PlusCircle size={28} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Post a New Ride</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
              <MapPin size={16} className="text-gray-500" />
              Pickup Location
            </label>
            <input type="text" name="pickup" required value={formData.pickup} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="e.g., North Dorms" />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
              <Map size={16} className="text-gray-500" />
              Destination
            </label>
            <input type="text" name="destination" required value={formData.destination} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="e.g., Science Building" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
              <Clock size={16} className="text-gray-500" />
              Departure Time
            </label>
            <input type="time" name="time" required value={formData.time} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
              <Users size={16} className="text-gray-500" />
              Available Seats
            </label>
            <input type="number" name="seats" min="1" max="8" required value={formData.seats} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
              <Car size={16} className="text-gray-500" />
              Vehicle Type
            </label>
            <input type="text" name="vehicle" required value={formData.vehicle} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="e.g., Honda Civic, Blue" />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
              <Phone size={16} className="text-gray-500" />
              Contact Number
            </label>
            <input type="tel" name="contact" required value={formData.contact} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="e.g., 555-0123" />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1">
            <FileText size={16} className="text-gray-500" />
            Notes / Rules (Optional)
          </label>
          <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="e.g., No eating in the car, leaving exactly on time..."></textarea>
        </div>

        <div className="pt-6 mt-4 border-t border-gray-100">
          <button type="submit" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-md">
            <CheckCircle size={20} />
            Publish Ride Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostRide;