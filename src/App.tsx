import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Result from './components/Result';
import './App.css';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const data = await response.json();
    setQuestions(data.results);
  };

  const handleStart = (name: string) => {
    setUserName(name);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) setScore(score + 1);
    setCorrectAnswer(questions[currentQuestionIndex].correct_answer);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswered(false);
    setUserAnswer('');
    setCorrectAnswer('');
    setTimeLeft(30);
  };

  const restartQuiz = () => {
    setUserName('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setUserAnswer('');
    setCorrectAnswer('');
    setTimeLeft(30);
    fetchQuestions();
  };

  if (!userName) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      {questions?.length > 0 && currentQuestionIndex < 10 ? (
        <Question
          question={questions[currentQuestionIndex]}
          handleAnswer={handleAnswer}
          isAnswered={isAnswered}
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
          nextQuestion={nextQuestion}
        />
      ) : (
        <Result score={score} totalQuestions={10} restartQuiz={restartQuiz} />
      )}
    </div>
  );
};

export default App;
