import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      res.data = fighterService.getFighters();
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.get(
  "/:id",
  (req, res, next) => {
    try {
      res.data = fighterService.search({ id: req.params.id });
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      if (!res.error) {
        res.data = fighterService.create(req.body);
      }
    } catch (err) {
      res.error = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      if (!res.error) {
        res.data = fighterService.updateFighterInfo(req.params.id, req.body);
      }
    } catch (err) {
      res.error = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.delete(
  "/:id",
  (req, res, next) => {
    try {
      res.data = fighterService.deleteId(req.params.id);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
