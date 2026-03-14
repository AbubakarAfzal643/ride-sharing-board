import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../store/userSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    major: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border-t-4 border-green-500">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            name="name"
            required 
            value={formData.name} 
            onChange={handleChange} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
            placeholder="John Doe" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Campus Email</label>
          <input 
            type="email" 
            name="email"
            required 
            value={formData.email} 
            onChange={handleChange} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
            placeholder="student@campus.edu" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Major / Department</label>
          <input 
            type="text" 
            name="major"
            required 
            value={formData.major} 
            onChange={handleChange} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
            placeholder="e.g., Computer Science" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            name="password"
            required 
            value={formData.password} 
            onChange={handleChange} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
            placeholder="••••••••" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition mt-4"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-green-600 hover:text-green-800 font-semibold">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Register;