import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from '../Question';

const question = {
  question: 'What is the capital of France?',
  correct_answer: 'Paris',
  incorrect_answers: ['London', 'Berlin', 'Madrid'],
};

test('renders Question and handles answer selection', () => {
  const handleAnswer = jest.fn();
  const nextQuestion = jest.fn();
  render(
    <Question
      question={question}
      handleAnswer={handleAnswer}
      isAnswered={false}
      userAnswer=""
      correctAnswer=""
      nextQuestion={nextQuestion}
    />
  );

  fireEvent.click(screen.getByText('Paris'));
  expect(handleAnswer).toHaveBeenCalledWith('Paris');
});
