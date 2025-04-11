// src/components/Profile.jsx
import React from 'react';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Briefcase,
  Building2,
  Users2,
} from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* Profile Image + Welcome (stacked, left-aligned) */}
      <div className="flex flex-col items-start">
        <img
          src="src/assets/profile.jpg"
          alt="Profile"
          className="w-24 h-24 rounded object-cover mb-2"
        />
        <p className="text-lg md:text-xl font-medium">
          Welcome back, <span className="font-semibold text-black">“Mr. Ananya Raghav”</span>
        </p>
      </div>

      {/* Fields in two columns */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Briefcase size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Employee ID:</span>
            <span>24DJKBDFVX8C</span>
          </div>

          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Designation:</span>
            <span>Sr. Associate Mgr.</span>
          </div>

          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Joining Date:</span>
            <span>15 Jan 2025</span>
          </div>

          <div className="flex items-center">
            <Users2 size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Reporting Mgr:</span>
            <span>Mr. S.N. Kadu</span>
          </div>

          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Father’s Name:</span>
            <span>Mr. Raghav Shandilya</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Email ID:</span>
            <span>ananya@mail.com</span>
          </div>

          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Contact No. :</span>
            <span>+919876543210</span>
          </div>

          <div className="flex items-center">
            <Building2 size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Department:</span>
            <span>Operations</span>
          </div>

          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">D.O.B. :</span>
            <span>17 Sept. 2002</span>
          </div>
        </div>
      </div>

      {/* Address - Aligned + Wrapped */}
      <div className="mt-8 flex items-start">
        <MapPin size={16} className="mr-2 mt-1" />
        <div className="flex">
          <span className="font-semibold w-36 shrink-0">Address:</span>
          <span className="max-w-md">
            24 - D, Krishna Nagar, near Twinkle Towers, Market Road, Cannaught Place,
            New Delhi - 110001, India
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
