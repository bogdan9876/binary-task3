import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const checkAtLeastOnePropertyExists = (body, model) => {
  return Object.keys(body).some((key) => model.hasOwnProperty(key));
};

const createFighterValid = async (req, res, next) => {
  const errors = [];
  const { name, power, defense, health } = req.body;

  if (!name) {
    errors.push("Name is required");
  }
  if (!power) {
    errors.push("Power is required");
  }
  if (!defense) {
    errors.push("Defense is required");
  }

  if (power && !(+power >= 1 && +power <= 100)) {
    errors.push("Power should be between 1 and 100");
  }
  if (defense && !(+defense >= 1 && +defense <= 10)) {
    errors.push("Defense should be between 1 and 10");
  }
  if (health && !(+health >= 80 && +health <= 120)) {
    errors.push("Health should be between 80 and 120");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const updateFighterValid = async (req, res, next) => {
  const errors = [];
  const { name, power, defense, health } = req.body;

  if (!checkAtLeastOnePropertyExists(req.body, FIGHTER)) {
    errors.push("You should pass at least one property");
  }
  if (Object.keys(req.body).some((key) => key === "id")) {
    errors.push("Id property is not allowed");
  }

  if (power && !(+power >= 1 && +power <= 100)) {
    errors.push("Power should be between 1 and 100");
  }
  if (defense && !(+defense >= 1 && +defense <= 10)) {
    errors.push("Defense should be between 1 and 10");
  }
  if (health && !(+health >= 80 && +health <= 120)) {
    errors.push("Health should be between 80 and 120");
  }

  if (name) {
    const isNameExists = await fighterService.search({ name });
    if (isNameExists && isNameExists.id !== req.params.id) {
      errors.push("Fighter already exists with this name");
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

export { createFighterValid, updateFighterValid };
