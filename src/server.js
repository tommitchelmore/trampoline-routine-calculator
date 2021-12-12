import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { resolve } from 'path'

import authRoutes from './routes/authRoutes'
import mainRoutes from './routes/mainRoutes'
import userRoutes from './routes/userRoutes'
import contributorRoutes from './routes/contributorRoutes'
import adminRoutes from './routes/contributorRoutes'

const app = express()

dotenv.config({ path: resolve(__dirname, "../.env") })

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
}))

app.use('/auth', authRoutes)
app.use(userRoutes)
app.use(contributorRoutes)
app.use(adminRoutes)
app.use(mainRoutes)

export default app