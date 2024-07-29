import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StartScreen from '../StartScreen';

test('renders StartScreen and starts quiz', () => {
  const mockOnStart = jest.fn();
  
  render(<StartScreen onStart={mockOnStart} />);
  
  const input = screen.getByLabelText(/name/i);
  const button = screen.getByRole('button', { name: /start/i });
  
  fireEvent.change(input, { target: { value: 'John Doe' } });
  fireEvent.click(button);
  
  expect(mockOnStart).toHaveBeenCalledWith('John Doe');
});
