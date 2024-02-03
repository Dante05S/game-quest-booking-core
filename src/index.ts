import { AppDataSource } from './database/data-source'
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import apiRouter from './routes/index'
import helmet from 'helmet'

AppDataSource.initialize()
  .then(() => {
    const app = express()
    const port = process.env.PORT ?? 3001

    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compression())

    // Routes
    app.use('/api/v1', apiRouter)

    // Say hello
    app.get('/', (_req, res) =>
      res.status(200).json({ message: 'Welcome to Game Quest Booking Core!' })
    )

    // Local environment
    if (process.env.ENV === 'local') {
      app.listen(port, () => {
        console.log(`Servidor escuchando en :${port}`)
      })
    }
  })
  .catch((error) => {
    console.log(error)
  })