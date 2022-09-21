import Input from "./UI/Input";
import classes from "./Registration.module.css";
import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/auth";

const Registration = (props) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userList, setUserList] = useState([]);

  const dispatch = useDispatch();

  const emailInputRef = createRef();
  const nameInputRef = createRef();
  const passInputRef = createRef();
  const verificationPassInputRef = createRef();

  useEffect(() => {
    getUserList();
  }, []);
  // defining api call functions
  //================================================ to get user List =================================================
  const getUserList = async () => {
    const response = await fetch(
      "https://quiz-app-b658e-default-rtdb.firebaseio.com/userList.json"
    );
    const responseData = await response.json();
    const availableUsers = responseData.users.split(",");
    setUserList(availableUsers);
  };

  //================================================ to updateUserList =================================================
  const updateUserList = (newUserList) => {
    fetch("https://quiz-app-b658e-default-rtdb.firebaseio.com/userList.json", {
      method: "PATCH",
      body: JSON.stringify({
        users: newUserList,
      }),
    }).then(alert("User List Updated"));
  };

  //================================================ to add user data =================================================
  const addUserData = (userData) => {
    fetch("https://quiz-app-b658e-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(userData),
    }).then(alert("User Registered"));
  };

  //   =========================================================  handling user registration ======================================================================
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const clearInputValues = () => {
      emailInputRef.current.value = "";
      nameInputRef.current.value = "";
      passInputRef.current.value = "";
      verificationPassInputRef.current.value = "";
    };

    //     validating user inputs ==================================================

    const name = nameInputRef.current.value.trim();
    const email = emailInputRef.current.value.trim();
    const password = passInputRef.current.value.trim();
    const verificationPassword = verificationPassInputRef.current.value.trim();

    if (name.length === 0) {
      setErrorMessage("Name Invalid, Enter Valid Name");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }

    if (email.length === 0) {
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

    if (password !== verificationPassword) {
      setErrorMessage("Please re-enter the same Password");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }

    // ================================================

    let username = email.split("@")[0]; // separating username form email

    const userOperation = () => {
      if (userList.includes(username)) {
        setErrorMessage(
          "User Already Registered Please try with different email"
        );
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        return;
      } else {
        console.log("else block");
        //creating new user here
        const userData = {
          name: name,
          highScore: 0,
          matchesPlayed: 0,
          userName: username,
          password: password,
        };
        addUserData(userData);
        console.log(" database users", userList);
        const updatedUserList = userList.concat(username).join(",");
        console.log("users after updation", updatedUserList);
        updateUserList(updatedUserList);
        // dispatch(authSliceActions.logInHandler(userData));
        clearInputValues();
        alert("You are registered Please Login");
        props.toggleUserState(false);
      }
    };
    userOperation();
  };
  //   ========================================================= ending handling user registration ======================================================================

  return (
    <div className="question-card ">
      <p>Create an Account</p>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <Input ref={nameInputRef} placeholder="Enter Name" type="text" />
        <Input ref={emailInputRef} placeholder="Enter Email" type="email" />
        <Input
          ref={passInputRef}
          placeholder="Enter Password"
          type="password"
        />
        <Input
          ref={verificationPassInputRef}
          placeholder="Re-Enter password"
          type="password"
        />
        <p className={classes.errMsg}>{isError ? errorMessage : " "}</p>
        <div className={classes["action-container"]}>
          <button type="submit" className="btn">
            Register
          </button>
          <span
            className={classes.lnk}
            onClick={() => {
              props.toggleUserState(false);
            }}
          >
            Registered?
          </span>
        </div>
      </form>
    </div>
  );
};
export default Registration;
