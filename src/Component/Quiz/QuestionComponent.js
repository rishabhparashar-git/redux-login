import { useState } from "react";
import QuestionsArray from "./questions.json";
import "./question.css";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/auth";

export default function QuestionComponent(props) {
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const [clicked, setclicked] = useState("");
  const dispatch = useDispatch();

  function logOutHandler() {
    dispatch(authSliceActions.logOutHandler());
  }

  const { user: userData, token } = useSelector((state) => state.authReducer);
  console.log(userData);

  const updateHighScore = async () => {
    const response = await fetch(
      `https://quiz-app-b658e-default-rtdb.firebaseio.com/users/${token}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          matchesPlayed: userData.matchesPlayed + 1,
          highScore: score,
        }),
      }
    );
  };

  let questionToDisplay = QuestionsArray[questionCounter];
  function nextHandler(e) {
    e.preventDefault();
    if (questionCounter < 4) {
      setDisabled(false);
      setQuestionCounter(questionCounter + 1);
      return;
    }
    if (questionCounter === 4) {
      if (score > userData.highScore) {
        dispatch(authSliceActions.updateHighScore(score));
        updateHighScore();
      }
      props.endQuizHandler();
    }
  }

  return (
    <div className="container">
      <div className="">
        <button className="btn" onClick={logOutHandler}>
          LogOut
        </button>
        <div className="profile">
          <span>{userData.name}</span>
          <span>Score : {score}</span>
        </div>
        <p>{questionToDisplay.question}</p>
        <ul>
          {questionToDisplay.answer.map((option, index) => (
            <button
              onClick={() => {
                setDisabled(true);
                setclicked(option);
                if (option === questionToDisplay.correctAnswer) {
                  setScore((score) => score + 20);
                }
              }}
              className="btn"
              key={index}
              id={
                clicked === option
                  ? option === questionToDisplay.correctAnswer
                    ? "true"
                    : "false"
                  : ""
              }
              disabled={isDisabled}
            >
              {option}
            </button>
          ))}
        </ul>

        <button
          onClick={nextHandler}
          className="btn next"
          disabled={!isDisabled}
        >
          {questionCounter === 4 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
