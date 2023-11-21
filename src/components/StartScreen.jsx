import React from "react";
import { useQuiz } from "../context/QuizContext";

const StartScreen = () => {

  const {numQuestions, dispatch} = useQuiz();

    const startQuiz = () => {
        dispatch({type:'start'})
    }

  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} questions to test your React level.</h3>
      <button className="btn btn-ui" onClick={startQuiz}>Let's start</button>
    </div>
  );
};

export default StartScreen;
