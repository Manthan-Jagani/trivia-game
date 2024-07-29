import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Result from '../Result';

test('renders Result component and restarts quiz', () => {
  const mockRestartQuiz = jest.fn();
  
  render(<Result score={5} totalQuestions={10} restartQuiz={mockRestartQuiz} />);
  
  expect(screen.getByText(/total questions served/i)).toBeInTheDocument();
  expect(screen.getByText(/total correct questions/i)).toBeInTheDocument();
  expect(screen.getByText(/total incorrect questions/i)).toBeInTheDocument();
  
  const button = screen.getByRole('button', { name: /restart quiz/i });
  
  fireEvent.click(button);
  
  expect(mockRestartQuiz).toHaveBeenCalled();
});
