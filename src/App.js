import "./App.css";
import "./Component/STYLE.css";
// import UserAuth from "./Component/AuthUser.js";
import Registration from "./Component/Registration";
import { useState } from "react";
// import PopupComponent from "./Component/PopupComponent";
import Login from "./Component/Login.js";
import { useSelector } from "react-redux";
import UserProfile from "./Component/UserProfile";

function App() {
  // const [toDisplay, setToDisplay] = useState("getUser");
  // const [name, setName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [score, setScore] = useState(0);
  // const [resetScore, setResetScore] = useState(false);

  const [isNewUser, setIsNewUser] = useState(false);

  const { isAuthenticated, user: userData } = useSelector(
    (state) => state.authReducer
  );
  const getUser = isNewUser ? (
    <Registration toggleUserState={setIsNewUser} />
  ) : (
    <Login toggleUserState={setIsNewUser} />
  );
  return (
    <div className="App">
      <p>{`Authentication Status : ${isAuthenticated} \nUser Data : ${JSON.stringify(
        userData
      )}`}</p>
      {isAuthenticated ? <UserProfile /> : getUser}
    </div>
  );
}

export default App;
