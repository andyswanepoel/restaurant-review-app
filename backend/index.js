require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Restaurant = require("./models/restaurant");
const User = require("./models/user");
require("./connection/database").connect();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/restaurants", (req, res) => {
  Restaurant.find({}).then((notes) => {
    res.status(200).json(notes);
  });
});

app.get("/api/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  Restaurant.find({ reviewer: req.params.id }).then((notes) => {
    res.status(200).json(notes);
  });
});

app.post("/api/restaurants", async (req, res) => {
  const { restaurant, address, cuisines, rating, reviewer } = req.body;

  // Create new restaurant review document
  const newRestaurant = await Restaurant.create({
    restaurant,
    address: {
      street: address.street,
      city: address.city
    },
    cuisines,
    rating,
    reviewer
  });
  res.status(200).json(newRestaurant);
});

app.post("/user-login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(email, password);

    // Validate user input
    if (!(email && password)) {
      res.status(401).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h"
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/user-registration", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).redirect("/user-login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword
    });

    // Create token
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h"
    });

    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(4001, () => {
  console.log(`Example app listening at http://localhost:4001`);
});
