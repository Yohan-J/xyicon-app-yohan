import React from 'react';
import { Link } from 'react-router-dom';
import '../shared-styles/AnswerPage.css';
import { PortTemplate } from '../../components/answer2/port-template/PortTemplate';

const Answer2Page: React.FC = () => {
  return (
    <div className="answer-page">
      <header className="answer-page-header">
        <Link to="/" className="answer-page-back">
          &larr; Back
        </Link>
        <h1>Answer 2 - PortTemplate Component</h1>
      </header>
      <main className="answer-page-content">
        <PortTemplate />
      </main>
    </div>
  );
};

export default Answer2Page;
