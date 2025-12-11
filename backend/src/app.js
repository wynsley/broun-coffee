/* eslint-disable no-undef */
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

// --- IMPORTACIÓN DE RUTAS ---

// 1. Rutas de Autenticación (NUEVO ARCHIVO)
const authRoutes = require("./routes/auth.routes");

// 2. Rutas de Negocio (Productos y Categorías)
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

dotenv.config();

// Inicializamos Express como 'server'
const server = express();
const port = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());

// --- DEFINICIÓN DE RUTAS ---

// A. Autenticación (Login, Register, Logout)
server.use("/", authRoutes);

// B. Negocio
server.use("/products", productRoutes);
server.use("/categories", categoryRoutes);

// C. Ruta de prueba
server.get("/api-status", (req, res) => {
  res.json({ message: "API Broun Coffee funcionando" });
});

// --- LEVANTAR SERVIDOR ---
server.listen(port, async () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada correctamente");

  } catch (error) {
    console.error("Error de conexión BD:", error);
  }
});
