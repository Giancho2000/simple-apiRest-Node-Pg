import bcryptjs from 'bcryptjs';

import { createJWT } from '../helpers/jwt.js';
import userModel from '../models/user.js';
import { sequelizeConn } from '../db/config.js';

const User = userModel(sequelizeConn);

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ msg: `User not found with email: ${email}` });
        }

        if (!user.status) {
            return res.status(400).json({ msg: `User has some problems, please contact support` });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({ msg: `Invalid password` });
        }
        
        const token = await createJWT(user.id);

        res.json({ 
            msg:`Welcome ${user.name}`,  
            token 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `Something went wrong, please contact support` });
    }

};
