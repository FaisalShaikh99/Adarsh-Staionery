import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, editProfile, deleteAccount, updateForm } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // select the user from the redux store
  const authForm = useSelector((state) => state.auth.form);// select the auth form from the redux stor

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

  useEffect(() => {
    if (user) {  // agar user hai to form ko update kar sakte hai
      dispatch(updateForm({ field: 'name', value: user.name }));
      dispatch(updateForm({ field: 'email', value: user.email }));
      dispatch(updateForm({ field: 'avatarUrl', value: user.avatarUrl || null }));
    }
  }, [user, dispatch]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ field: name, value }));
  };

  // jab user information save karne ke liye 
  const handleSaveUserInfo = () => {
    dispatch(editProfile());
    setIsEditingUserInfo(false);
  };

  // edited user info cancel karne ke liye
  const handleCancelEditUserInfo = () => {
    if (user) {
      dispatch(updateForm({ field: 'name', value: user.name }));
      dispatch(updateForm({ field: 'email', value: user.email }));
      dispatch(updateForm({ field: 'avatarUrl', value: user.avatarUrl || null }));
    }
    setIsEditingUserInfo(false);
  };

  //logout
const handleLogout = () => {
  // Clear Redux auth state
  dispatch(logout());

  // Clear localStorage
  localStorage.removeItem("currentUser");

  // OPTIONAL: If user was logged in via Google, log them out from Google
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser?.isThirdParty) {
    // This will fully logout user from Google session
    window.location.href = "https://accounts.google.com/Logout";
    return; // avoid navigating back manually
  }

  // Navigate to login for local users
  navigate("/login");
};


  // delete account
  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  // confirmation for delete account
  const confirmDelete = () => {
    dispatch(deleteAccount());
    setShowDeleteConfirm(false);
    navigate("/register");
  };

  // cancel delete account
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const getAvatarLetter = (name) => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase(); // first letter of the name in capital
    }
    return 'U'; // defualt U
  };

  // user nahi hai to use login page per redirect 
  if (!user) {
    return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text">
        <p className="text-3xl text-accent">Please Login to view your profile</p>
        <button
          onClick={() => navigate('/login')}
          className="ml-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition duration-200"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-secondary/20">
        <h2 className="text-4xl font-bold text-accent mb-8 text-center">
          Your Profile
        </h2>

        {/* User Information Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-6 border-b border-gray-200">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-4xl font-semibold shadow-md overflow-hidden">
            {user.avatarUrl ? ( 
              <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : ( 
              getAvatarLetter(user.name) 
            )}
          </div>
          {/* User Details / Edit Form */}
          <div className="text-center sm:text-left flex-grow">
            {!isEditingUserInfo ? ( /* agar user info edit nahi karni to user ka name aur email show hoga */
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-text text-2xl font-semibold mb-1">{user.name}</p>
                <p className="text-gray-600 text-lg">{user.email}</p>
                <button
                  onClick={() => setIsEditingUserInfo(true)}
                  className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition duration-200"
                >
                  Edit Profile
                </button>
              </div>
            ) : ( // agar user info edit karni hai to form show hoga
              <div className="w-full">
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-text text-left">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={authForm.name} 
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent text-text"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-text text-left">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent text-text"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={handleCancelEditUserInfo}
                    className="px-6 py-2 border border-gray-300 text-text rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUserInfo}
                    className="px-6 py-2 bg-accent text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-accent text-white rounded-md shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition duration-200 text-lg font-medium"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-200 text-lg font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-text mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;