import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import { login } from '../controllers/auth.js';


const authRouter = Router();

authRouter.post('/login', [
    check('email', 'The email is not valid').isEmail(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields 
], login );

export default authRouter;