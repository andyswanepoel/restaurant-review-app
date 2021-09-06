import styles from "./ReviewList.module.css";

import ReviewListItem from "../ReviewListItem/ReviewListItem";

const ReviewList = ({ reviews }) => {
  return (
    <div className={styles["restaurant-board"]}>
      <h2 className={styles["restaurant-board-header"]}>Restaurant Reviews</h2>
      {reviews.length > 0 && (
        <ul className={styles["restaurant-board-list"]}>
          {reviews.map((review) => (
            <ReviewListItem
              key={review.id}
              restaurant={review.restaurant}
              address={review.address}
              cuisines={review.cuisines}
              rating={review.rating}
              reviewer={review.reviewer}
            />
          ))}
        </ul>
      )}
      {reviews.length === 0 && <p>Please add some reviews!</p>}
    </div>
  );
};

export default ReviewList;
