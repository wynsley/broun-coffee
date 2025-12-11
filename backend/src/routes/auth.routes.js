const { Router } = require("express");
const controller = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const schema = require("../utils/schemas/user.schema");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

// Rutas Públicas
router.post(
  "/register",
  validate(schema.registerSchema, "body"),
  controller.register
);
router.post("/login", validate(schema.loginSchema, "body"), controller.login);
router.post("/logout", controller.logout);

// Rutas Protegidas (Requieren token)
router.post("/about-me", authMiddleware, controller.aboutMe);

module.exports = router;
