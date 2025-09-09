import jwt from 'jsonwebtoken';

import { sequelizeConn } from '../db/config';
import userModel from '../models/user.js';

const User = userModel(sequelizeConn);

export const validateJWT = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    };

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findByPk(uid);
        if(!user) {
            return res.status(401).json({
                msg: 'Invalid token - user does not exist'
            });
        }

        if(!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - user inactive'
            });
        };
        
        req.user = user;
        
        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            msg: 'Invalid token'
        })

    };

};