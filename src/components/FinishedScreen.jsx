import React from "react";

const FinishedScreen = ({ points, maxPoints, highscore, dispatch }) => {
  const percentage = (points / maxPoints) * 100;

  return (
    <div className="result">
      <p>
        You have score <strong>{points}</strong> out of {maxPoints} - (
        {Math.ceil(percentage)})%
      </p>
      <p className="highscore">Highscore : {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quizz
      </button>
    </div>
  );
};

export default FinishedScreen;
