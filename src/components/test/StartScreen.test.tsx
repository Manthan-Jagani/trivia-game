import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StartScreen from '../StartScreen';

test('renders StartScreen and starts the game', () => {
  const handleStart = jest.fn();
  render(<StartScreen onStart={handleStart} />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.click(screen.getByText(/start/i));

  expect(handleStart).toHaveBeenCalledWith('John Doe');
});
