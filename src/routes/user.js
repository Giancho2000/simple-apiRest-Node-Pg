import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from '../controllers/user.js';
import { existingUserByEmail } from '../helpers/evaluate-fields.js';
import { validateFields } from '../middlewares/validate-fields.js';


const router = Router();
//Create user
router.post('/', [ 
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(existingUserByEmail),  
    validateFields 
] ,createUser );

// Get all users
router.get('/', getUsers );

// Get user by ID
router.get('/:id', [
    check('id', 'ID must be a number').isString(),
    check('id','Is not valid ID').isUUID(),
    validateFields
] , getUserById );

// Update user by ID
router.put('/:id',[
    check('id', 'ID must be a number').isString(),
    check('id','Is not valid ID').isUUID(),
    validateFields
] , updateUserById );

// Delete user by ID
router.delete('/:id',[
    check('id', 'ID must be a number').isString(),
    check('id','Is not valid ID').isUUID(),
    validateFields
], deleteUserById );

export default router;