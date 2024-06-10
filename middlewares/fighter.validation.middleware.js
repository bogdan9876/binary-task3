import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const createFighterValid = (req, res, next) => {
  const errors = [];
  if (!req.body.name) {
    errors.push("Name is required");
  }
  if (!req.body.power) {
    errors.push("Power is required");
  }
  if (!req.body.defense) {
    errors.push("Defense is required");
  }
  if (Object.keys(req.body).some((key) => key === "id")) {
    errors.push("Id property is not allowed");
  }

  if (!(+req.body.power >= 1 && +req.body.power <= 100)) {
    errors.push("Power should be between 1 and 100");
  }
  if (!(+req.body.defense >= 1 && +req.body.defense <= 10)) {
    errors.push("Defense should be between 1 and 10");
  }
  if (!req.body.health) {
    req.body.health = 100;
  } else if (!(+req.body.health >= 80 && +req.body.health <= 120)) {
    errors.push("Health should be between 80 and 120");
  }

  const isNameExists = fighterService.search({ name: req.body.name });
  if (isNameExists) {
    errors.push("User already exists with this name");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  const errors = [];
  if (!checkAtLeastOnePropertyExists(req.body, FIGHTER)) {
    errors.push("You should pass at least one property");
  }
  if (Object.keys(req.body).some((key) => key === "id")) {
    errors.push("Id property is not allowed");
  }

  if (req.body.power && !(+req.body.power >= 1 && +req.body.power <= 100)) {
    errors.push("Power should be between 1 and 100");
  }
  if (
    req.body.defense &&
    !(+req.body.defense >= 1 && +req.body.defense <= 10)
  ) {
    errors.push("Defense should be between 1 and 10");
  }
  if (req.body.health && !(+req.body.health >= 80 && +req.body.health <= 120)) {
    errors.push("Health should be between 80 and 120");
  }

  if (req.body.name) {
    const isNameExists = fighterService.search({ name: req.body.name });
    if (isNameExists) {
      errors.push("User already exists with this name");
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

export { createFighterValid, updateFighterValid };
