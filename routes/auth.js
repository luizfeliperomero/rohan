import express from 'express';
import { authenticate, createUser } from '../controllers/authController.js';

const router = express.Router();

router.post("/", authenticate);
router.post("/register", createUser);

export default router;
