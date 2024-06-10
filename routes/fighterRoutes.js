// import { Router } from "express";
// import { fighterService } from "../services/fighterService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";
// import {
//   createFighterValid,
//   updateFighterValid,
// } from "../middlewares/fighter.validation.middleware.js";

// const router = Router();

// router.get(
//   "/",
//   (req, res, next) => {
//     try {
//       const fighters = fighterService.getAll();
//       res.data = fighters;
//     } catch (err) {
//       res.err = err;
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// router.get(
//   "/:id",
//   (req, res, next) => {
//     try {
//       const fighter = fighterService.search(req.params.id);
//       if (!fighter) throw new Error("Fighter not found.");
//       res.data = fighter;
//     } catch (err) {
//       res.err = err;
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// router.post(
//   "/",
//   createFighterValid,
//   (req, res, next) => {
//     try {
//       if (!res.error) {
//         res.data = fighterService.createFighter(req.body);
//       }
//     } catch (err) {
//       res.err = err;
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// router.put(
//   "/:id",
//   updateFighterValid,
//   (req, res, next) => {
//     try {
//       const updatedFighter = fighterService.update(req.params.id, req.body);
//       if (!updatedFighter) throw new Error("Fighter not found.");
//       res.data = updatedFighter;
//     } catch (err) {
//       res.err = err;
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// router.delete(
//   "/:id",
//   (req, res, next) => {
//     try {
//       const fighter = fighterService.delete(req.params.id);
//       if (!fighter) throw new Error("Fighter not found.");
//       res.data = fighter;
//     } catch (err) {
//       res.err = err;
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// export { router };

import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
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
      // TODO: Implement login action (get the user if it exist with entered credentials)
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
      // TODO: Implement login action (get the user if it exist with entered credentials)
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
      // TODO: Implement login action (get the user if it exist with entered credentials)
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
      // TODO: Implement login action (get the user if it exist with entered credentials)
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
