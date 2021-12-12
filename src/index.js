import dotenv from 'dotenv'
import {resolve} from 'path'
import { init } from './database'
import server from './server'

(async () => {
    dotenv.config({ path: resolve(__dirname, "../.env") })
    await init()
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})()