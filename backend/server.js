import express from 'express'
import mysql from 'mysql2/promise';
import 'dotenv/config';

const app = express();
app.use(express.json());
const PORT = 3000;

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'classwork',
});

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let storedUser= {name:'', email: '', password: ''};
  try {
    // insert into users(name, email, password) values('Aryan', 'abc@gmail.com' , 'abc');
    const [results, fields] = await connection.query('SELECT * FROM users WHERE email=?', [email]);
    console.log(results[0]);
    storedUser= results[0];
    console.log(storedUser);
  } catch (err) {
    return res.status(404).json({ success: false, message: err });
  }
  res.status(200).json({ success: true, message: `Welcome ${storedUser.name}` ,data: storedUser})
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  /*
  1. Check if user already exists: if exists alert
  2. 
  */
});