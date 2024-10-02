import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import App from './App';


const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <App />
      </Router>
    </ClerkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);