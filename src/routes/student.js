import express from 'express';
const router = express.Router();
import upload from '../utils/multerUtils.js';
import { Profile_Controller } from '../controllers/Profile.controller.js';

// MiddleWare

router.get('/', (req, res) => {
  res.send('Student Hero Page');
});

router.get('/register', (req, res) => {
  res.send('Student upload');
});

router.get('/profile', Profile_Controller);

router.get('/fee', (req, res) => {
  res.send('Student fee Page');
});

export default router;
