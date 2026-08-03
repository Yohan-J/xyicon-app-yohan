import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>XYIcon Assessment by Yohan</h1>
      <p>Select an answer to continue.</p>
      <div className="landing-page-buttons">
        <button
          type="button"
          className="landing-page-button"
          onClick={() => navigate('/answer-1')}
        >
          Answer 1
        </button>
        <button
          type="button"
          className="landing-page-button"
          onClick={() => navigate('/answer-2')}
        >
          Answer 2
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
