import React from 'react';

interface ResultProps {
  score: number;
  totalQuestions: number;
  restartQuiz: () => void;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, restartQuiz }) => {
  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
      <p className="text-lg mb-2">Total Questions Served: {totalQuestions}</p>
      <p className="text-lg mb-2">Total Correct Questions: {score}</p>
      <p className="text-lg">Total Incorrect Questions: {totalQuestions - score}</p>
      <button 
        onClick={restartQuiz} 
        className="mt-4 bg-purple-500 hover:bg-purple-700 text-white p-2 rounded"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
