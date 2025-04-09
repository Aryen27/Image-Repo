import express from 'express'
import mysql from 'mysql2/promise';
import 'dotenv/config';
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(express.json());
const PORT = 3000;

// DB Config
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'classwork',
});

// Multer Config  ({dest:'./data/'})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/')
  },
  filename: function (req, file, cb) {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname+'-'+suffix+ext)
  }
})

const upload= multer({storage: storage})

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let storedUser= {name:'', email: '', password: ''};
  try {
    // insert into users(name, email, password) values('Aryan', 'abc@gmail.com' , 'abc');
    const [results, fields] = await connection.query('SELECT * FROM users WHERE email=?', [email]);
    if (results.length == 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    storedUser= results[0];
    console.log(storedUser);
  } catch (err) {
    return res.status(404).json({ success: false, message: err });
  }
  const match = await bcrypt.compare(password, storedUser.password);

  if(!match) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  res.status(200).json({ success: true, message: `Welcome ${storedUser.name}` ,data: storedUser})
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  /*
  1. Check if user already exists: if exists alert
  2. Hash password
  3. Add user to db w/ hashed password
  4.Add error handling for DB queries
  */
  const [results, fields] = await connection.query('SELECT * FROM users WHERE email=?', [email]);
  if (results.length != 0) {
    return res.status(409).json({ success: false, message: 'User already exists' });
  }
  
  // Encrypting password
  const saltRounds = 10;
  const hashedPass= await bcrypt.hash(password, saltRounds);
  
  try { 
    const [results, fields] = await connection.query('INSERT INTO users(name, email, password) VALUES(?,?,?)', [name, email, hashedPass]);
    return res.status(200).json({ success: true, message: 'Account has been created successfully', results});
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }

});

app.post("/file", upload.single('profile'), async (req, res) => {
  const profile = req.file;
})