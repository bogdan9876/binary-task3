import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+380[0-9]{9}$/;

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (!firstName) {
    res.status(400).send({ error: true, message: "First name is required" });
  } else if (!lastName) {
    res.status(400).send({ error: true, message: "Last name is required" });
  } else if (!email) {
    res.status(400).send({ error: true, message: "Email is required" });
  } else if (!emailRegex.test(email)) {
    res.status(400).send({ error: true, message: "Invalid email" });
  } else if (!phoneNumber) {
    res.status(400).send({ error: true, message: "Phone number is required" });
  } else if (!phoneRegex.test(phoneNumber)) {
    res.status(400).send({ error: true, message: "Invalid phone number" });
  } else if (!password) {
    res.status(400).send({ error: true, message: "Password is required" });
  } else if (password.length < 3) {
    res.status(400).send({
      error: true,
      message: "Password must be at least 3 characters long",
    });
  } else {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email,
      phoneNumber,
      password,
    };
    req.body = user;
    next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
  userService.checkKeyInModel(USER, req.body);
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (email && !emailRegex.test(email)) {
    res.status(400).send({ error: true, message: "Invalid email" });
  } else if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    res.status(400).send({ error: true, message: "Invalid phone number" });
  } else if (password && password.length < 3) {
    res.status(400).send({
      error: true,
      message: "Password must be at least 3 characters long",
    });
  } else {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      res.status(400).send({
        error: true,
        message: "At least one field from the model must be present",
      });
    } else {
      next();
    }
  }
};

export { createUserValid, updateUserValid };
