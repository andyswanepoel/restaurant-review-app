import { useState } from "react";
import LogIn from "../LogIn/LogIn";
import Register from "../Register/Register";

const UserManagementContainer = ({ onRegister, onLogIn }) => {
  const [showLogIn, setShowLogIn] = useState(true);

  const handleToggle = () => {
    setShowLogIn((prevLogIn) => {
      return !prevLogIn;
    });
  };

  return (
    <div>
      {showLogIn && <LogIn onLogIn={onLogIn} onToggle={handleToggle} />}
      {!showLogIn && (
        <Register onRegister={onRegister} onToggle={handleToggle} />
      )}
    </div>
  );
};

export default UserManagementContainer;
