const { Router } = require("express");
const controller = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const schema = require("../utils/schemas/user.schema");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

// Todas las rutas de usuarios requieren estar logueado
router.use(authMiddleware);

// GET /users (Listar con búsqueda opcional)
router.get(
  "/",
  validate(schema.searchUserSchema, "query"),
  controller.getUsers
);

// GET /users/:id
router.get(
  "/:id",
  validate(schema.userIdSchema, "params"),
  controller.getUserById
);

// PUT /users/:id
router.put(
  "/:id",
  [
    validate(schema.userIdSchema, "params"),
    validate(schema.updateUserSchema, "body"),
  ],
  controller.updateUser
);

// DELETE /users/:id
router.delete(
  "/:id",
  validate(schema.userIdSchema, "params"),
  controller.deleteUser
);

module.exports = router;
