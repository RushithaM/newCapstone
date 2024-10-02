import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, FileText, Briefcase, Building, User, ChevronLeft, ChevronRight } from 'lucide-react';
// Import Clerk components and hooks
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();  // Get user info from Clerk

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className={`bg-gray-900 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
      <button onClick={toggleNavbar} className="p-4 self-end">
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
      <div className="flex-grow">
        <NavItem icon={<Home size={24} />} text="Dashboard" to="/dashboard" isOpen={isOpen} />
        <NavItem icon={<FileText size={24} />} text="Resume Based QA" to="/resume-qa" isOpen={isOpen} />
        <NavItem icon={<Briefcase size={24} />} text="Role Based QA" to="/role-qa" isOpen={isOpen} />
        <NavItem icon={<Building size={24} />} text="Company Based QA" to="/company-qa" isOpen={isOpen} />
        {/* Link the profile to Clerk's user profile page */}
        <NavItem icon={<User size={24} />} text="Edit Profile" to="/profile" isOpen={isOpen} />
      </div>
      <div className="p-4">
        {/* Clerk's UserButton allows users to access profile settings */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in" className="text-white">Sign In</Link>
        </SignedOut>
      </div>
    </nav>
  );
};

// Navigation item component
const NavItem = ({ icon, text, to, isOpen }) => (
  <Link to={to} className="flex items-center p-4 hover:bg-gray-800">
    {icon}
    {isOpen && <span className="ml-4">{text}</span>}
  </Link>
);

export default Navbar;
