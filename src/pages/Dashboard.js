import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FileText, Briefcase, Building, Clock, BarChart, AlertCircle, PlayCircle, Star } from 'lucide-react';

const Dashboard = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    resume: null,
  });

  const [resumeQuestionCount, setResumeQuestionCount] = useState(0);
  const [roleQuestionCount, setRoleQuestionCount] = useState(0);
  const [companyQuestionCount, setCompanyQuestionCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const maxQuestions = isPro ? 50 : 10;

  // State for dynamic performance analytics
  const [timeSpent, setTimeSpent] = useState(0); // Time spent in hours
  const [successRate, setSuccessRate] = useState(0); // Success rate percentage
  const [areaToImprove, setAreaToImprove] = useState(''); // Area to improve

  useEffect(() => {
    const hasSubmittedForm = localStorage.getItem('hasSubmittedForm');
    if (hasSubmittedForm) {
      setIsNewUser(false);
    }
    const storedResumeCount = localStorage.getItem('resumeQuestionCount');
    const storedRoleCount = localStorage.getItem('roleQuestionCount');
    const storedCompanyCount = localStorage.getItem('companyQuestionCount');

    if (storedResumeCount) setResumeQuestionCount(parseInt(storedResumeCount, 10));
    if (storedRoleCount) setRoleQuestionCount(parseInt(storedRoleCount, 10));
    if (storedCompanyCount) setCompanyQuestionCount(parseInt(storedCompanyCount, 10));

    const userIsPro = localStorage.getItem('isPro') === 'true';
    setIsPro(userIsPro);

    // Simulate fetching dynamic performance analytics
    setTimeout(() => {
      setTimeSpent(0); // Example fetched data
      setSuccessRate(0); // Example fetched data
      setAreaToImprove('Technical Skills'); // Example fetched data
    }, 1000); // Simulating an API delay
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    localStorage.setItem('hasSubmittedForm', 'true');
    setIsNewUser(false);
  };

  const getProgressWidth = (count) => `${(count / maxQuestions) * 100}%`;

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        {isNewUser ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {/* Form inputs */}
          </form>
        ) : (
          <>
            {/* Recommended Resources Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Recommended Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard title="10 Tips for Acing Your Interview" icon={<FileText size={24} />} />
                <ResourceCard title="How to Answer Behavioral Questions" icon={<PlayCircle size={24} />} />
                <ResourceCard title="Mastering the STAR Method" icon={<Star size={24} />} />
              </div>
            </div>

            {/* Performance Analytics Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Performance Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalyticsCard title="Time Spent" value={`${timeSpent} hours`} icon={<Clock />} />
                <AnalyticsCard title="Success Rate" value={`${successRate}%`} icon={<BarChart />} />
                <AnalyticsCard title="Areas to Improve" value={areaToImprove} icon={<AlertCircle />} />
              </div>
            </div>

            {/* Question Tracker */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Question Tracker</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Resume Based Questions Card */}
              <DashboardCard
                icon={<FileText size={24} />}
                title="Resume Based Questions"
                to="/resume-qa"
                progress={getProgressWidth(resumeQuestionCount)}
                questionCount={resumeQuestionCount}
                maxQuestions={maxQuestions}
                color="bg-blue-100"
              />

              {/* Role Based Questions Card */}
              <DashboardCard
                icon={<Briefcase size={24} />}
                title="Role Based Questions"
                to="/role-qa"
                progress={getProgressWidth(roleQuestionCount)}
                questionCount={roleQuestionCount}
                maxQuestions={maxQuestions}
                color="bg-green-100"
              />

              {/* Company Based Questions Card */}
              <DashboardCard
                icon={<Building size={24} />}
                title="Company Based Questions"
                to="/company-qa"
                progress={getProgressWidth(companyQuestionCount)}
                questionCount={companyQuestionCount}
                maxQuestions={maxQuestions}
                color="bg-yellow-100"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// Resource Card component
const ResourceCard = ({ title, icon }) => (
  <div className="bg-white shadow rounded-lg p-6 hover:bg-gray-50 cursor-pointer flex flex-col items-center">
    <div className="text-blue-500 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-center mb-2">{title}</h3>
    <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2">View</button>
  </div>
);

// Analytics Card component for Performance Analytics
const AnalyticsCard = ({ title, value, icon }) => (
  <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
    <div className="text-blue-500 p-3 rounded-full mb-4">{icon}</div>
    <h3 className="font-semibold text-center mb-2">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

// Dashboard card for Question Tracker
const DashboardCard = ({ icon, title, to, progress, questionCount, maxQuestions, color }) => (
  <Link to={to} className="bg-white shadow rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50">
    <div className={`${color} p-3 rounded-full mb-4`}>
      {icon}
    </div>
    <h3 className="font-semibold text-center mb-2">{title}</h3>
    <p className="text-sm mb-2">Questions Generated: {questionCount} / {maxQuestions}</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: progress }}></div>
    </div>
  </Link>
);

export default Dashboard;
