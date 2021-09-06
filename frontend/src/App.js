import { useEffect, useState } from "react";
import UserDashboard from "./Components/Reviews/UserDashboard/UserDashboard";
import UserManagementContainer from "./Components/UserManagement/UserManagementContainer/UserManagementContainer";

import { registerUser, logInUser } from "./requests/requests";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const previousUser = sessionStorage["user"];
    if (previousUser !== undefined) {
      setUser(JSON.parse(previousUser));
      setLoggedIn(true);
    }
  }, []);

  const handleLogIn = async (loggedInUser) => {
    const response = await logInUser(loggedInUser);

    if (response?.status === 200) {
      const { data } = response;
      sessionStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setLoggedIn(true);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    setLoggedIn(false);
    sessionStorage.removeItem("user");
  };

  const handleRegister = async (registeredUser) => {
    const response = await registerUser(registeredUser);

    if (response?.status === 201) {
      const { data } = response;
      sessionStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setLoggedIn(true);
    }
  };

  return (
    <div>
      {loggedIn && <UserDashboard user={user} onLogOut={handleLogOut} />}
      {!loggedIn && (
        <UserManagementContainer
          onLogIn={handleLogIn}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};
export default App;
