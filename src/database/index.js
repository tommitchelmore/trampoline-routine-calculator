import mysql from 'mysql2'
import initMysql from 'mysql2/promise'
import { promises as fs } from 'fs'
import dotenv from 'dotenv'
import {resolve} from 'path'

dotenv.config({ path: resolve(__dirname, "../.env") })

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
})

const promisePool = pool.promise()

const init = async () => {
  try {
    // Connect to database
    console.log('[INIT] Connecting to database...')
    const conn = await initMysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true
    })
    console.log('[INIT] Connected to database')

    // Create the database if it doesn't exist already
    console.log('[INIT] Creating schema if not exists...')
    await conn.query('CREATE DATABASE IF NOT EXISTS `' + process.env.DB_NAME + '`')
    await conn.query('USE `' + process.env.DB_NAME + '`')
    console.log('[INIT] Schema created')

    // Create tables if they don't already exist
    try {
      console.log('[INIT] Initialising tables...')
      const tables = await fs.readFile('./scripts/sql/createTables.sql', 'utf8')
      await conn.query(tables)
    } catch (err) {
      console.error('[INIT] Error initialising tables: ' + err.message)
      process.kill(process.pid, 'SIGINT')
    }

    // Validate tables exist
    const [rows] = await conn.query('SHOW TABLES')
    if (rows.filter(r => ['routine', 'routine_skill', 'skill', 'user'].includes(Object.values(r)[0])).length !== 4)
      throw new Error('[INIT] Failed to init tables')
    console.log('[INIT] Tables initialised')

  } catch (error) {
    console.error(error)
  }
}

export { promisePool as pool, init }