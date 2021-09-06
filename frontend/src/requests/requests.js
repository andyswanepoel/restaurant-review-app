import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4001" : "";

export const getAllReviews = async () => {
  try {
    const response = await axios.get(baseUrl + "/api/restaurants");
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getReviewByUser = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/api/restaurants/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const postReview = async (review) => {
  try {
    return await axios.post(baseUrl + "/api/restaurants", review);
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const registerUser = async (user) => {
  try {
    return await axios.post(baseUrl + "/user-registration", user);
  } catch (err) {
    console.error(err);
  }
};

export const logInUser = async (user) => {
  try {
    return await axios.post(baseUrl + "/user-login", user);
  } catch (err) {
    console.error(err);
  }
};
