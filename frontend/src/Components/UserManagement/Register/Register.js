import { useState } from "react";
import styles from "./Register.module.css";

const Register = ({ onRegister, onToggle }) => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
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
    onRegister(formValues);
    setFormValues({ first_name: "", last_name: "", email: "", password: "" });
  };

  return (
    <form className={styles["register-form"]} onSubmit={handleSubmit}>
      <h2 className={styles["register-form-header"]}>User Registration</h2>
      <fieldset className={styles["register-form-input-container"]}>
        <label
          className={styles["register-form-input-label"]}
          htmlFor="first_name"
        >
          First Name
        </label>
        <input
          className={styles["register-form-input"]}
          id="first_name"
          name="first_name"
          type="text"
          value={formValues.first_name}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={styles["register-form-input-container"]}>
        <label
          className={styles["register-form-input-label"]}
          htmlFor="last_name"
        >
          Last Name
        </label>
        <input
          className={styles["register-form-input"]}
          id="last_name"
          name="last_name"
          type="text"
          value={formValues.last_name}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={styles["register-form-input-container"]}>
        <label className={styles["register-form-input-label"]} htmlFor="email">
          Email
        </label>
        <input
          className={styles["register-form-input"]}
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={styles["register-form-input-container"]}>
        <label
          className={styles["register-form-input-label"]}
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={styles["register-form-input"]}
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </fieldset>
      <button>Submit</button>
      <p className={styles["toggle"]}>
        Already have an account?{" "}
        <button
          type="button"
          className={styles["toggle-link"]}
          onClick={() => {
            onToggle();
          }}
        >
          Log in here.
        </button>
      </p>
    </form>
  );
};

export default Register;
