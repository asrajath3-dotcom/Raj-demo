import React from 'react';

const Profile = () => {
  return (
    <div className="animate-fadeInUp">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center card-hover border border-gray-100">
            <div className="w-28 h-28 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-4xl">JD</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-500 text-sm">john.doe@email.com</p>
            <p className="text-gray-400 text-xs mt-1">Member since 2024</p>
            <button className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 card-hover border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                  <p className="text-gray-800 font-medium">John Doe</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                  <p className="text-gray-800 font-medium">March 15, 1990</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Blood Type</label>
                  <p className="text-gray-800 font-medium">O+</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Allergies</label>
                  <p className="text-gray-800 font-medium">Pollen, Penicillin</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone</label>
                  <p className="text-gray-800 font-medium">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Emergency Contact</label>
                  <p className="text-gray-800 font-medium">Jane Doe: +1 (555) 987-6543</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;