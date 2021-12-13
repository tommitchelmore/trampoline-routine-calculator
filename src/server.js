import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { resolve } from 'path'

import authRoutes from './routes/authRoutes'
import publicRoutes from './routes/publicRoutes'
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

app.use('/api', publicRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', contributorRoutes)
app.use('/api', adminRoutes)

app.get('*', (req, res) => res.sendFile('index.html', { root: resolve(__dirname, './../client/build') }))

export default app