import * as dotenv from 'dotenv'
import mysql from 'mysql2/promise'
dotenv.config({ path: './src/server/config/.env' })

console.log('database', process.env.JWT_ACCESS)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export default pool