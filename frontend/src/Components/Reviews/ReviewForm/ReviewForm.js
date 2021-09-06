import { useState } from "react";

import styles from "./ReviewForm.module.css";

const ReviewForm = ({ onNewReview, reviewer }) => {
  const [formValues, setFormValues] = useState({
    restaurant: "",
    address: {
      street: "",
      city: ""
    },
    cuisines: [],
    rating: "",
    reviewer
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewReview(formValues);
    setFormValues((prevFormValues) => {
      return Object.assign(prevFormValues, {
        restaurant: "",
        address: {
          street: "",
          city: ""
        },
        cuisines: [],
        rating: ""
      });
    });
    e.target.reset();
  };

  const handleChange = (e) => {
    const target = e.target;

    if (target.name === "street" || target.name === "city") {
      setFormValues((prevFormValues) => {
        const address = Object.assign(prevFormValues.address, {
          [target.name]: target.value
        });
        return {
          ...prevFormValues,
          address
        };
      });
    } else {
      setFormValues((prevFormValues) => {
        return {
          ...prevFormValues,
          [target.name]: target.value
        };
      });
    }
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    const { cuisines } = formValues;

    if (checked && !cuisines.includes(value)) {
      cuisines.push(value);
    }

    if (!checked && cuisines.includes(value)) {
      const i = cuisines.indexOf(value);
      cuisines.splice(i, 1);
    }
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        cuisines
      };
    });
  };

  return (
    <form
      className={styles["review-form"]}
      autoComplete="false"
      onSubmit={handleSubmit}
    >
      <h2 className={styles["review-form-header"]}>Add a Restaurant Review</h2>
      <fieldset className={styles["review-form-input-container"]}>
        <label
          className={styles["review-form-input-label"]}
          htmlFor="restaurant"
        >
          Restaurant Name
        </label>
        <input
          id="restaurant"
          name="restaurant"
          type="text"
          value={formValues.restaurant}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={styles["review-form-input-container"]}>
        <div className={styles["review-form-input-container"]}>
          <label className={styles["review-form-input-label"]} htmlFor="street">
            Street Address
          </label>
          <input
            id="street"
            name="street"
            type="text"
            value={formValues.address.street}
            onChange={handleChange}
          />
        </div>
        <div className={styles["review-form-input-container"]}>
          <label className={styles["review-form-input-label"]} htmlFor="city">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formValues.address.city}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <fieldset className={styles["review-form-input-container"]}>
        <p className={styles["review-form-input-label"]}>Cuisines</p>
        <div>
          <input
            id="coffee"
            name="cuisines"
            type="checkbox"
            value="Coffee"
            checked={formValues.cuisines.includes("Coffee")}
            onChange={handleCheck}
          />
          <label htmlFor="coffee">Coffee</label>
        </div>
        <div>
          <input
            id="diner"
            name="cuisines"
            type="checkbox"
            value="Diner"
            checked={formValues.cuisines.includes("Diner")}
            onChange={handleCheck}
          />
          <label htmlFor="diner">Diner</label>
        </div>
        <div>
          <input
            id="mexican"
            name="cuisines"
            type="checkbox"
            value="Mexican"
            checked={formValues.cuisines.includes("Mexican")}
            onChange={handleCheck}
          />
          <label htmlFor="mexican">Mexican</label>
        </div>
        <div>
          <input
            id="italian"
            name="cuisines"
            type="checkbox"
            value="Italian"
            checked={formValues.cuisines.includes("Italian")}
            onChange={handleCheck}
          />
          <label htmlFor="italian">Italian</label>
        </div>
        <div>
          <input
            id="indian"
            name="cuisines"
            type="checkbox"
            value="Indian"
            checked={formValues.cuisines.includes("Indian")}
            onChange={handleCheck}
          />
          <label htmlFor="indian">Indian</label>
        </div>
      </fieldset>
      <fieldset className={styles["review-form-input-container"]}>
        <label className={styles["review-form-input-label"]} htmlFor="rating">
          Rating
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.5"
          value={+formValues.rating}
          onChange={handleChange}
        />
      </fieldset>
      <input type="hidden" name="reviewer" value={reviewer} />
      <button>Submit</button>
    </form>
  );
};

export default ReviewForm;
