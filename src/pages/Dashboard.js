import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FileText, Briefcase, Building } from 'lucide-react';

const Dashboard = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    resume: null
  });

  // Separate counters for each question type
  const [resumeQuestionCount, setResumeQuestionCount] = useState(0);
  const [roleQuestionCount, setRoleQuestionCount] = useState(0);
  const [companyQuestionCount, setCompanyQuestionCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const maxQuestions = isPro ? 50 : 10;

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
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
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

const DashboardCard = ({ icon, title, to, progress, questionCount, maxQuestions, color }) => (
  <Link to={to} className="bg-white shadow rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50">
    <div className={`${color} p-3 rounded-full mb-4`}>
      {icon}
    </div>
    <h3 className="font-semibold text-center mb-2">{title}</h3>
    <p className="text-sm mb-2">Questions Generated: {questionCount} / {maxQuestions}</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: progress }}
      ></div>
    </div>
  </Link>
);

export default Dashboard;
