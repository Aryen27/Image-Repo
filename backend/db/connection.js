import 'dotenv/config'
import mysql from 'mysql2/promise';


const connectionCred= await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'classwork',
});

export default connectionCred;