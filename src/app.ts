import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import User from './models/users';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || '', {});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashed, buildings: [] });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    res.json({ message: 'Login successful', userId: user._id });
  } else {
    res.status(401).json({ error: 'Incorrect password' });
  }
});

// Add building to user
app.post('/api/user/:id/buildings', async (req, res) => {
  const userId = req.params.id;
  const building = req.body; // expects the full building structure from frontend
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.buildings.push(building);
  await user.save();
  res.json({ message: 'Building added', buildings: user.buildings });
});

app.listen(5000, () => console.log('Server running on 5000'));
