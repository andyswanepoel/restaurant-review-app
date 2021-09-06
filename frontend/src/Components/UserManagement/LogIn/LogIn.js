import { useState } from "react";
import styles from "./Login.module.css";

const LogIn = ({ onToggle, onLogIn }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const target = e.target;

    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [target.name]: target.value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(formValues);
    setFormValues({ email: "", password: "" });
  };
  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2 className={styles["login-form-header"]}>User Login</h2>
      <fieldset className={styles["login-form-input-container"]}>
        <label className={styles["login-form-input-label"]} htmlFor="email">
          Email
        </label>
        <input
          className={styles["login-form-input"]}
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={styles["login-form-input-container"]}>
        <label className={styles["login-form-input-label"]} htmlFor="password">
          Password
        </label>
        <input
          className={styles["login-form-input"]}
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </fieldset>
      <button>Submit</button>
      <p className={styles["toggle"]}>
        Don't have an account?{" "}
        <button
          className={styles["toggle-link"]}
          type="button"
          onClick={() => {
            onToggle();
          }}
        >
          Register here.
        </button>
      </p>
    </form>
  );
};

export default LogIn;
