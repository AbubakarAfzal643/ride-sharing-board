import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store/userSlice';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // 1. Verify current password
    if (currentPassword !== currentUser.password) {
      setMessage({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    // 2. Check if new passwords match
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    // 3. Prevent changing to the same password
    if (currentPassword === newPassword) {
      setMessage({ type: 'error', text: 'New password must be different from the current one.' });
      return;
    }

    // 4. Dispatch action to update password in Redux
    dispatch(changePassword(newPassword));
    
    // 5. Show success message and clear form
    setMessage({ type: 'success', text: 'Password successfully updated!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border-t-4 border-yellow-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
      
      {/* Alert Message */}
      {message.text && (
        <div className={`px-4 py-3 rounded mb-4 ${message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input 
            type="password" 
            required 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-yellow-500 focus:border-yellow-500" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input 
            type="password" 
            required 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-yellow-500 focus:border-yellow-500" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input 
            type="password" 
            required 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-yellow-500 focus:border-yellow-500" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition mt-4"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;