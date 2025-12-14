const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const globalMiddlewares = ({server}) => {
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))
    server.use(cookieParser())

    // --- CORRECCIÓN CRÍTICA DE CORS ---
    server.use(cors({
        origin: true, 
        credentials: true 
    }))
}

module.exports = { globalMiddlewares }
