import { useState, createRef, useEffect } from "react";
import classes from "./Registration.module.css";
import Input from "./UI/Input";
import { authSliceActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userList, setUserList] = useState(["oldData"]);
  const passInputRef = createRef();
  const emailInputRef = createRef();
  const dispatch = useDispatch();

  const getUserList = () => {
    fetch("https://quiz-app-b658e-default-rtdb.firebaseio.com/userList.json")
      .then((response) => response.json())
      .then((responseData) => {
        setUserList(responseData.users.split(","));
      });
  };

  const getUserData = async (username) => {
    const response = await fetch(
      `https://quiz-app-b658e-default-rtdb.firebaseio.com/users.json`
    );
    const responseData = await response.json();

    let userData;
    let token;
    for (const key in responseData) {
      if (responseData[key].userName === username) {
        token = key;
        userData = responseData[key];
      }
    }
    return [userData, token];
  };

  useEffect(() => {
    getUserList();
  }, []);

  function formSubmitHandler(event) {
    event.preventDefault();

    const username = emailInputRef.current.value.split("@")[0];
    const password = passInputRef.current.value;

    if (username.length === 0) {
      setErrorMessage("Enter Email");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }

    if (password.length !== 6) {
      setErrorMessage("Password should contain exactly 6 characters");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }

    const userOperation = async () => {
      if (!userList.includes(username)) {
        setErrorMessage("User Not found, Please Register");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        return;
      }
      const [userData, token] = await getUserData(username);
      if (password !== userData.password) {
        setErrorMessage("Incorrect Password");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        return;
      }
      console.log("successfully logged in");
      dispatch(authSliceActions.logInHandler({ userData, token }));
    };

    userOperation();
  }

  return (
    <div className="question-card">
      <p>Log In</p>

      <form onSubmit={formSubmitHandler} className={classes.form}>
        <Input ref={emailInputRef} placeholder="Enter Email" type="email" />
        <Input
          ref={passInputRef}
          placeholder="Enter Password"
          type="password"
        />

        <p className={classes.errMsg}>{isError ? errorMessage : " "}</p>
        <div className={classes["action-container"]}>
          <button type="submit" className="btn">
            LogIn
          </button>
          <span
            className={classes.lnk}
            onClick={() => {
              props.toggleUserState(true);
            }}
          >
            New User?
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
