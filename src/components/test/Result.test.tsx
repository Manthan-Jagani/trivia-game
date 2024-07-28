import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Result from '../Result';

test('renders Result and restarts the quiz', () => {
  const restartQuiz = jest.fn();
  render(<Result score={7} totalQuestions={10} restartQuiz={restartQuiz} />);

  expect(screen.getByText(/Total Questions Served: 10/)).toBeInTheDocument();
  expect(screen.getByText(/Total Correct Questions: 7/)).toBeInTheDocument();
  expect(screen.getByText(/Total Incorrect Questions: 3/)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Restart Quiz/));
  expect(restartQuiz).toHaveBeenCalled();
});
