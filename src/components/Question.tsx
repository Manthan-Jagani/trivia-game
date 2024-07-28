import React from 'react';

interface QuestionProps {
  question: any;
  handleAnswer: (answer: string) => void;
  isAnswered: boolean;
  userAnswer: string;
  correctAnswer: string;
  nextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, handleAnswer, isAnswered, userAnswer, correctAnswer, nextQuestion }) => {
  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <div className="flex flex-col">
        {question.incorrect_answers.concat(question.correct_answer).sort().map((answer: string) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            disabled={isAnswered}
            className={`mb-2 p-2 rounded ${isAnswered ? (answer === correctAnswer ? 'bg-green-500' : 'bg-red-500') : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          >
            {answer}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="mt-4">
          <p className={`${userAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'} font-semibold`}>
            {userAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'}
          </p>
          {userAnswer !== correctAnswer && <p className="text-gray-700">Correct Answer: {correctAnswer}</p>}
          <button onClick={nextQuestion} className="mt-4 bg-purple-500 hover:bg-purple-700 text-white p-2 rounded">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
