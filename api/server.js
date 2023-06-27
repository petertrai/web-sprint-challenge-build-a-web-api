const express = require('express');
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
const server = express();
const { logger } = require('./logger-middleware')

require('dotenv').config()
const cors = require('cors')

server.use(logger)
server.use(express.json())
server.use(cors())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)



module.exports = server;
