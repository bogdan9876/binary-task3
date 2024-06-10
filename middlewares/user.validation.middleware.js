import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+380[0-9]{9}$/;

const checkKeyInModel = (model, body) => {
  const modelKeys = Object.keys(model);
  for (const key of Object.keys(body)) {
    if (!modelKeys.includes(key)) {
      return { error: true, message: `Field '${key}' is not allowed` };
    }
  }
  return null;
};

const createUserValid = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (!firstName) {
    return res.status(400).send({ error: true, message: "First name is required" });
  } 
  if (!lastName) {
    return res.status(400).send({ error: true, message: "Last name is required" });
  } 
  if (!email) {
    return res.status(400).send({ error: true, message: "Email is required" });
  } 
  if (!emailRegex.test(email)) {
    return res.status(400).send({ error: true, message: "Invalid email" });
  } 
  if (!phoneNumber) {
    return res.status(400).send({ error: true, message: "Phone number is required" });
  } 
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).send({ error: true, message: "Invalid phone number" });
  } 
  if (!password) {
    return res.status(400).send({ error: true, message: "Password is required" });
  } 
  if (password.length < 3) {
    return res.status(400).send({ error: true, message: "Password must be at least 3 characters long" });
  }

  const existingUserByEmail = await userService.search({ email });
  if (existingUserByEmail) {
    return res.status(400).send({ error: true, message: "Email already exists" });
  }

  const existingUserByPhone = await userService.search({ phoneNumber });
  if (existingUserByPhone) {
    return res.status(400).send({ error: true, message: "Phone number already exists" });
  }

  next();
};

const updateUserValid = async (req, res, next) => {
  const { id, email, phoneNumber, password } = req.body;

  if (id) {
    return res.status(400).send({ error: true, message: "ID should not be present in the body" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: true, message: "At least one field from the model must be present" });
  }
  const validationError = checkKeyInModel(USER, req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }
  if (email && !emailRegex.test(email)) {
    return res.status(400).send({ error: true, message: "Invalid email" });
  }
  if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    return res.status(400).send({ error: true, message: "Invalid phone number" });
  }
  if (password && password.length < 3) {
    return res.status(400).send({ error: true, message: "Password must be at least 3 characters long" });
  }
  if (email) {
    const existingUserByEmail = await userService.search({ email });
    if (existingUserByEmail && existingUserByEmail.id !== req.params.id) {
      return res.status(400).send({ error: true, message: "Email already exists" });
    }
  }

  if (phoneNumber) {
    const existingUserByPhone = await userService.search({ phoneNumber });
    if (existingUserByPhone && existingUserByPhone.id !== req.params.id) {
      return res.status(400).send({ error: true, message: "Phone number already exists" });
    }
  }

  next();
};

export { createUserValid, updateUserValid };
