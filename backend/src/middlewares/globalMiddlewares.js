const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const globalMiddlewares = ({ server }) => {
  server.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }))

  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use(cookieParser())
}

module.exports = { globalMiddlewares }