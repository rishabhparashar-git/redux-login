import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth";
import QuestionComponent from "./Quiz/QuestionComponent";

export default function Quiz() {
  const userData = useSelector((state) => state.authReducer.user);
  const [quizEnd, setQuizEnd] = useState(true);
  const dispatch = useDispatch();
  function endQuiz() {
    setQuizEnd(true);
  }
  function logOutHandler() {
    dispatch(authSliceActions.logOutHandler());
  }
  return (
    <div className="question-card">
      {quizEnd ? (
        <>
          <p>{`Hi ${userData.name} your high score is ${userData.highScore}`}</p>{" "}
          <br />
          <button
            className="btn"
            onClick={() => {
              setQuizEnd(false);
            }}
          >
            Play
          </button>
          <button className="btn" onClick={logOutHandler}>
            LogOut
          </button>
        </>
      ) : (
        <QuestionComponent endQuizHandler={endQuiz} />
      )}
    </div>
  );
}
