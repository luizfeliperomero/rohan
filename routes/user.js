import express from 'express';
import { getUsers } from '../controllers/userController.js';
import authorizeRole from '../middlewares/rolesMiddleware.js';

const router = express.Router();

router.get("/", authorizeRole("admin"), getUsers);


export default router;
