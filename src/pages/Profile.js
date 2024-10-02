import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobDescriptionFile: null, // Changed to handle file upload for job description
  });
  const [resume, setResume] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (userLoaded && isSignedIn) {
      setFormData({
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      });
    }
  }, [userLoaded, isSignedIn, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userLoaded || !isSignedIn) return;

    try {
      await user.update({
        fullName: formData.name,
        primaryEmailAddress: formData.email,
        publicMetadata: {
          ...user.publicMetadata,
        },
      });

      // Handle job description file upload here
      if (formData.jobDescriptionFile) {
        // Logic to handle job description file upload
        console.log('Job Description file:', formData.jobDescriptionFile);
      }

      if (resume) {
        // Resume upload logic can be added here
        console.log('Resume file:', resume);
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 bg-white p-2 rounded-md shadow"
            >
              <img
                src={user?.profileImageUrl || 'https://via.placeholder.com/50'} // Fallback image
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user?.fullName || 'User'}</span> {/* Fallback for user name */}
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Job Description File Upload */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="jobDescriptionFile"
            >
              Job Description (Upload File)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="jobDescriptionFile"
              type="file"
              accept=".pdf,.doc,.docx"
              name="jobDescriptionFile"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="resume"
            >
              Resume
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Profile
            </button>
            <Link
              to="/dashboard"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
