import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import App from './App';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders StartScreen and starts the game', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    results: [
      {
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['London', 'Berlin', 'Madrid']
      }
    ]
  }));

  render(<App />);
  expect(screen.getByText('Enter Your Name')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.click(screen.getByText(/start/i));

  expect(await screen.findByText(/What immense structure is referred to in Norse Mythology as the Yggdrasil.?/)).toBeInTheDocument();
});
