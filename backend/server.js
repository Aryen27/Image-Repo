import express from 'express'
import mysql from 'mysql2/promise';
import 'dotenv/config';
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import jwt from 'jsonwebtoken'
import connectionCred from './db/connection.js';
import { protect } from './middleware/protect.js';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

// DB Config
const connection = connectionCred;

// Multer Config  ({dest:'./data/'})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'./data/'));
  },
  filename: function (req, file, cb) {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const uid = req._uid || 'unknown';
    cb(null, `uid${uid}-${file.fieldname}-${suffix}${ext}`);
  }
});

const upload= multer({storage})

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});


// Authentication
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let storedUser= {name:'', email: '', password: ''};
  try {
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

  const token = jwt.sign({ id: storedUser.uid }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY
  });

  res.status(200).json({ success: true, message: `Welcome ${storedUser.name}` , data: storedUser, token })
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

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

// Photos

// Middleware to add uid to image name before uid is initialized
const parseFields = multer().none();
const attachUid = (req, res, next) => {
  req._uid = req.body.uid;
  next();
};

const tempStorage = multer().none();
const idParser = (req, res, next) => {
  req.uid = req.body.uid;
  next();
};

// Get photos by userid
app.get("/photo/:id", protect, async (req, res) => {
  const userid = req.params.id;
  let images;
  try {
    const [results, fields] = await connection.query('SELECT * FROM imgrepo WHERE userid=?', [userid]);
    let images = results;
    return res.status(200).json(images);
  } catch (err) {
    console.log(err);
  }
})


// Add photos
app.post("/photo/:id", protect, (req, res, next) => {
  req._uid = req.params.id;
  next();
}, upload.single('pic'), async (req, res) => {
  const filename = req.file.filename;
  const about = req.body.about;
  const uid = req.params.id;

  const [results] = await connection.query(
    'INSERT INTO imgrepo(title, about, userid) VALUES (?, ?, ?)',
    [filename, about, uid]
  );

  return res.status(200).json({ success: true, message: `${filename} uploaded successfully` });
});