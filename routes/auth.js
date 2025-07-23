import express from 'express';
import { authenticate, createUser } from '../controllers/authController.js';
import { body } from 'express-validator';
import { validate } from '../middlewares/validatorMiddleware.js';

const router = express.Router();
const emailValidator = () => body("email").isEmail();

router.post(
    "/", 
    emailValidator(), 
    validate, 
    authenticate
);
router.post(
    "/register", 
    emailValidator(), 
    validate, 
    createUser
);

export default router;
