/* eslint-disable no-undef */
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

// --- 1. IMPORTACIÓN DE RUTAS ---
// Auth y Usuarios
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Negocio (Existentes)
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

// Negocio (Nuevos - Asegúrate de que los archivos existan o la IA los creará)
const promotionRoutes = require('./routes/promotion.routes');
const reservationRoutes = require('./routes/reservation.routes');
const contactMessageRoutes = require('./routes/contactMessage.routes');
const orderRoutes = require('./routes/order.routes');

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

// --- 2. MIDDLEWARES ---
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());

// --- 3. RUTAS (Sin /api/v1) ---

// Autenticación
server.use('/', authRoutes); // /login, /register

// Módulos
server.use('/users', userRoutes);
server.use('/products', productRoutes);
server.use('/categories', categoryRoutes);
server.use('/promotions', promotionRoutes);
server.use('/reservations', reservationRoutes);
server.use('/contact', contactMessageRoutes); // Simplificado a /contact
server.use('/orders', orderRoutes);

// Test
server.get('/api-status', (req, res) => {
  res.json({ message: 'API Broun Coffee funcionando' });
});

// --- 4. SERVIDOR ---
server.listen(port, async () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada correctamente');
  } catch (error) {
    console.error('Error de conexión BD:', error);
  }
});