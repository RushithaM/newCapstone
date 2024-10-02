import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Briefcase, Building, User, ChevronLeft, ChevronRight, Zap, HelpCircle } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [generationsUsed, setGenerationsUsed] = useState(5); // Example: 5 generations used
  const maxGenerations = 5; // Max free generations

  const toggleNavbar = () => setIsOpen(!isOpen);

  const getProgressWidth = (used, max) => `${(used / max) * 100}%`;

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
        <NavItem icon={<HelpCircle size={24} />} text="Quiz Section" to="/quiz" isOpen={isOpen} /> {/* New Quiz Section */}
      </div>

      {/* Upgrade to Pro Section */}
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          {isOpen ? (
            <>
              <p className="text-sm mb-2">{generationsUsed} / {maxGenerations} Free Generations</p>
              <div className="w-full bg-gray-600 h-2 rounded-full mb-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{ width: getProgressWidth(generationsUsed, maxGenerations) }}
                ></div>
              </div>
              <Link to="/upgrade" className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:opacity-90">
                Upgrade <Zap size={16} className="ml-2" />
              </Link>
            </>
          ) : (
            <Link to="/upgrade" className="inline-flex items-center justify-center text-white hover:opacity-90">
              <Zap size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* Profile Icon */}
      <div className="p-4">
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
