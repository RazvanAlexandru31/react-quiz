import React from "react";

const NextButton = ({ dispatch, answer, index, questions }) => {
  if (answer === null) return null;
  return (
    <>
      {index < questions -1 ? (
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
