import { useAuth } from '@clerk/clerk-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useAuthenticatedApi() {
  const { getToken } = useAuth();

  const fetchWithAuth = async (url, options = {}) => {
    const token = await getToken();
    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  };

  return {
    fetchResumeQuestions: () => fetchWithAuth('/resume-questions'),
    fetchCompanyQuestions: () => fetchWithAuth('/company-questions'),
    fetchRoleQuestions: () => fetchWithAuth('/role-questions'),
    submitUserInput: (userData) => fetchWithAuth('/user-input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }),
  };
}