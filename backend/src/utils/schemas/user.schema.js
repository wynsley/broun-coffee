const Joi = require("joi");

const now = new Date();
// Calcular fecha para validar mayoría de edad (18 años)
const minBirthdate = new Date(
  now.getFullYear() - 18,
  now.getMonth(),
  now.getDate()
);

// Esquema para Registro
const registerSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.pattern.base": "El nombre solo puede contener letras y espacios",
    }),

  lastName: Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/)
    .messages({
      "string.pattern.base": "Ingrese un correo válido (gmail, hotmail, yahoo)",
    }),

  phone: Joi.string()
    .required()
    .min(9)
    .max(15)
    .pattern(/^\+\d{7,15}$/)
    .messages({
      "string.pattern.base":
        "El teléfono debe incluir código de país (ej: +51999999999)",
    }),

  birthdate: Joi.date()
    .less(minBirthdate)
    .required()
    .messages({ "date.less": "Debes ser mayor de 18 años" }),

  gender: Joi.string().valid("M", "F", "O").required(),

  address: Joi.string()
    .min(3)
    .max(100)
    .required()
    .pattern(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.]+$/),

  password: Joi.string()
    .min(8)
    .max(35)
    .required()
    .pattern(/^(?=(.*[A-Z]))(?=(.*\d.*\d)).+$/)
    .messages({
      "string.pattern.base":
        "La contraseña debe tener al menos 1 mayúscula y 2 números",
    }),

  repassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Las contraseñas no coinciden" }),
});

// Esquema para Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
