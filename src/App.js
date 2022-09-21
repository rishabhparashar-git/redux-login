import "./App.css";
import "./Component/STYLE.css";
import Registration from "./Component/Registration";
import { useState } from "react";
import Login from "./Component/Login.js";
import { useSelector } from "react-redux";
import Quiz from "./Component/Quiz";

function App() {
  const [isNewUser, setIsNewUser] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const getUser = isNewUser ? (
    <Registration toggleUserState={setIsNewUser} />
  ) : (
    <Login toggleUserState={setIsNewUser} />
  );
  return (
    <div className="App">
      {/* {isAuthenticated ? <UserProfile userData={userData} /> : getUser} */}
      {isAuthenticated ? <Quiz /> : getUser}
    </div>
  );
}

export default App;
