import React, { useReducer, useEffect } from "react";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Main from "./components/Main";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import FooterComponent from "./components/FooterComponent";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const reduce = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      console.log(currentQuestion);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...state, status: "ready", points: 0, answer: null, index: 0, secondsRemaining: 10 };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status:
          state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Error occured");
  }
};

const App = () => {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reduce, initialState);

  console.log(points);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: "dataFailed" });
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const numQuestions = questions.length;
  const questionsPoints = questions.map((point) => point.points);
  const totalPoints = questionsPoints.reduce((acc, sum) => {
    return acc + sum;
  }, 0);

  return (
    <div className="app">
      <Main>
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              totalPoints={totalPoints}
              points={points}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <FooterComponent>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questions={numQuestions}
              />
            </FooterComponent>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
