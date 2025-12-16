const dotenv = require('dotenv')
const express = require('express')
const { sequelize } = require('./models')
// import middleware globales
const { globalMiddlewares } = require('./middlewares/globalMiddlewares')

// --- 1. IMPORTACIÓN DE RUTAS ---
const { authRouter } = require('./routes/authRuter')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')
const contactMessageRoutes = require('./routes/contactMessage.routes')
const {reserveRouter} = require('./routes/reservation.routes')
const promotionRoutes = require('./routes/promotion.routes')

//leemos el archivo .env
dotenv.config()

// Inicializamos Express como 'server'
const server = express()
const port = process.env.PORT || 3000

// --- MIDDLEWARES GLOBALES ---
globalMiddlewares({server: server})

// --- DEFINICIÓN DE RUTAS ---

// 1. Autenticación (Login, Register, AboutMe)
server.use('/', authRouter)

// 2. Módulos 
server.use('/products', productRoutes)
server.use('/categories', categoryRoutes)
server.use('/orders', orderRoutes)
server.use('/contact', contactMessageRoutes)
server.use('/reservations', reserveRouter)
server.use('/promotions', promotionRoutes)

// 4. Ruta de prueba (Health Check)
server.get('/api-status', (req, res) => {
  res.json({ message: 'API Broun Coffee funcionando' })
})

// --- LEVANTAR SERVIDOR ---
server.listen(port, async () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`)
  
  try {
    // Verificamos conexión a la Base de Datos
    await sequelize.authenticate()
    console.log('Base de datos conectada correctamente')
    
  } catch (error) {
    console.error('Error de conexión BD:', error)
  }
})