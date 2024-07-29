import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from '../Question';

const mockQuestion = {
  question: "What is the capital of France?",
  correct_answer: "Paris",
  incorrect_answers: ["London", "Berlin", "Madrid"]
};

test('renders Question component and handles answer', () => {
  const mockHandleAnswer = jest.fn();
  const mockNextQuestion = jest.fn();
  
  render(
    <Question 
      question={mockQuestion} 
      handleAnswer={mockHandleAnswer} 
      isAnswered={false} 
      userAnswer="" 
      correctAnswer="" 
      nextQuestion={mockNextQuestion} 
    />
  );
  
  const buttons = screen.getAllByRole('button');
  
  fireEvent.click(buttons[0]);
  
  expect(mockHandleAnswer).toHaveBeenCalled();
});
