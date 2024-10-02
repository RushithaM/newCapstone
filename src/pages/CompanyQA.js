import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CompanyQA = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const maxQuestions = isPro ? 50 : 10;
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  useEffect(() => {
    const storedQuestionCount = localStorage.getItem('questionCount');
    if (storedQuestionCount) {
      setQuestionCount(parseInt(storedQuestionCount, 10));
    }
    const userIsPro = localStorage.getItem('isPro') === 'true';
    setIsPro(userIsPro);
    
    // Fetch suggested questions from the backend
    fetchSuggestedQuestions();
  }, []);

  const fetchSuggestedQuestions = async () => {
    try {
      const response = await fetch('/api/company-questions');
      const data = await response.json();
      setSuggestedQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching suggested questions:', error);
    }
  };

  const handleGenerateAnswer = async () => {
    if (questionCount >= maxQuestions) {
      alert("You've reached the maximum number of questions. Upgrade to Pro for more!");
      return;
    }

    if (!question.trim()) {
      alert("Please enter a question or select one from the suggestions.");
      return;
    }

    setAnswer("Generating answer...");
    try {
      const response = await fetch('/api/generate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, type: 'company' }),
      });
      const data = await response.json();
      setAnswer(data.answer);
      const newCount = questionCount + 1;
      setQuestionCount(newCount);
      localStorage.setItem('questionCount', newCount.toString());
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer("An error occurred while generating the answer. Please try again.");
    }
  };

  const handleSuggestedQuestionClick = (q) => {
    setQuestion(q);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Company Based Questions</h1>
        
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Enter your company-based question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleGenerateAnswer}
        >
          Generate Answer
        </button>
        {answer && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Answer:</h2>
            <p className="bg-white p-4 rounded shadow">{answer}</p>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Suggested questions:</h3>
          <ul className="list-disc pl-5">
            {suggestedQuestions.map((q, index) => (
              <li key={index} className="mb-2">
                <button 
                  className="text-blue-500 hover:underline"
                  onClick={() => handleSuggestedQuestionClick(q)}
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CompanyQA;