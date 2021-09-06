import styles from "./ReviewListItem.module.css";

const ReviewListItem = ({
  restaurant,
  address,
  cuisines,
  rating,
  reviewer
}) => {
  const ratingStyles = () => {
    if (rating > 7)
      return {
        backgroundColor: "green"
      };
    if (rating < 4)
      return {
        backgroundColor: "red"
      };
    return {};
  };

  return (
    <li className={styles["restaurant-board-list-item"]}>
      <div className={styles.restaurant}>
        <strong>{restaurant}</strong>
      </div>
      <div className={styles.address}>
        <strong>Address:</strong> {address.street}, {address.city}
      </div>
      <div className={styles.cuisines}>
        <strong>Cuisine:</strong> {cuisines.join(", ")}
      </div>
      <div className={styles.rating} style={ratingStyles()}>
        <strong>{rating}</strong>
      </div>
    </li>
  );
};

export default ReviewListItem;
