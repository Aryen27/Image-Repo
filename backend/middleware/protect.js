import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import mysql from 'mysql2/promise';
import connectionCred from '../db/connection.js';
import 'dotenv/config'

const connection = connectionCred;

export const protect= async (req,res,next)=> {

  console.log(req.headers);
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization?.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Please login to get access' });
  }
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.error('JWT verify error:', err);
  return res.status(403).json({ message: err.message });
  }
  console.log(decoded);
  const uid = decoded.id; 
  console.log('Uid: '+uid);

  let user;
  try {
    const [results, fields] = await connection.query('SELECT * FROM `users` WHERE uid=?', [uid]);
    console.log('results: '+results);
    if (results.length == 0) {
      return res.status(404).json({ message: 'User not found!. Try logging in again' });
    }
    user = results;
    console.log('user:'+user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  // Granting Access to routes
  next();
}