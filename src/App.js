
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
import { useQuiz } from "./context/QuizContext";

const App = () => {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Main>
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <FooterComponent>
            <Timer />
            <NextButton />
            </FooterComponent>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
};

export default App;
