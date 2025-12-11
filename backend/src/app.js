/* eslint-disable no-undef */
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

// --- IMPORTACIÓN DE RUTAS ---
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

// NOTA: Verifica que el archivo en la carpeta routes se llame 'authRuter.js' o 'authRouter.js'
const { authRouter } = require('./routes/authRuter');

dotenv.config();

// Inicializamos Express como 'server' (Unificado)
const server = express();
const port = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // Necesario para formularios
server.use(cookieParser());
server.use(cors());

// --- DEFINICIÓN DE RUTAS ---

// 1. Rutas de Autenticación
server.use('/', authRouter);

// 2. Rutas de Negocio (Productos, Categorías)
server.use('/products', productRoutes);
server.use('/categories', categoryRoutes);

// 3. Ruta base de prueba
server.get('/api-status', (req, res) => {
  res.json({ message: 'API Broun Coffee funcionando ☕' });
});

// --- LEVANTAR SERVIDOR ---
server.listen(port, async () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada correctamente');
    
    // await sequelize.sync({ force: false }); 
  } catch (error) {
    console.error('❌ Error de conexión BD:', error);
  }
});