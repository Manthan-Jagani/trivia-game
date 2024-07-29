import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders App component and handles quiz flow', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: [{ question: "What is 2+2?", correct_answer: "4", incorrect_answers: ["3", "5", "6"] }] })
    })
  ) as jest.Mock;

  render(<App />);
  
  const input = screen.getByLabelText(/name/i);
  const startButton = screen.getByRole('button', { name: /start/i });
  
  fireEvent.change(input, { target: { value: 'John Doe' } });
  fireEvent.click(startButton);
  
  await waitFor(() => expect(screen.getByText(/what is 2\+2\?/i)).toBeInTheDocument());
  
  const answerButton = screen.getByRole('button', { name: /4/i });
  
  fireEvent.click(answerButton);
  
  await waitFor(() => expect(screen.getByText(/correct/i)).toBeInTheDocument());
  
  const nextButton = screen.getByRole('button', { name: /next/i });
  
  fireEvent.click(nextButton);
  
  expect(screen.getByText(/quiz completed/i)).toBeInTheDocument();
});
