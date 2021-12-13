import bodyParser from 'body-parser'
import express from 'express'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
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

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cookieParser())

const RedisStore = connectRedis(session)
app.use(session({
  store: new RedisStore({
    client: redis.createClient(process.env.REDIS_URL)
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false
}))


app.use('/api', publicRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', contributorRoutes)
app.use('/api', adminRoutes)

app.get('*', (req, res) => res.sendFile('index.html', { root: resolve(__dirname, './../client/build') }))

export default app