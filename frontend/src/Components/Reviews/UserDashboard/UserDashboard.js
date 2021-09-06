import ReviewList from "../ReviewList/ReviewList";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useEffect, useState } from "react";

import {
  getAllReviews,
  postReview,
  getReviewByUser
} from "../../../requests/requests";

const UserDashboard = ({ user, onLogOut }) => {
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    const fetchedReviews = await getReviewByUser(user.id);
    setReviews(fetchedReviews);
  };

  // Fetch the review data
  useEffect(() => {
    fetchData();
  }, []);

  const handleNewReview = async (newReview) => {
    const response = await postReview(newReview);
    setReviews((prevReviews) => {
      return [...prevReviews, response?.data];
    });
  };

  return (
    <div>
      {user && `Welcome ${user.first_name}!`}
      <button onClick={() => onLogOut()}>Log Out</button>
      <ReviewList reviews={reviews} />
      <ReviewForm onNewReview={handleNewReview} reviewer={user.id} />
    </div>
  );
};

export default UserDashboard;
