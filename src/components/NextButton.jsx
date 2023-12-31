import React from "react";
import { useQuiz } from "../context/QuizContext";

const NextButton = () => {
  const {dispatch, answer, index, questions}= useQuiz();

  if (answer === null) return null;
  
  return (
    <>
      {index < questions.length -1 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
      )}
    </>
  );
};

export default NextButton;
