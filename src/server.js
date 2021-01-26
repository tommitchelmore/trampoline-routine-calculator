import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import apiRouter from './routes/apiRoutes'
import mainRouter from './routes/mainRoutes'

const app = express()

app.use(helmet())
app.use(morgan('tiny'))

app.use('/api/v1', apiRouter)
app.use(mainRouter)

app.listen()

export default app