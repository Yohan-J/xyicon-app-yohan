import React from 'react';
import { Link } from 'react-router-dom';
import PolygonCanvas from '../../components/answer1/polygon-canvas/PolygonCanvas';
import '../shared-styles/AnswerPage.css';

const Answer1Page: React.FC = () => {

  return (
    <div className="answer-page">
      <header className="answer-page-header">
        <Link to="/" className="answer-page-back">
          &larr; Back
        </Link>
        <h1>Answer 1 — Polygon Visualizer</h1>
      </header>
      <main className="answer-page-content">
        <PolygonCanvas />
      </main>
    </div>
  );
};

export default Answer1Page;
