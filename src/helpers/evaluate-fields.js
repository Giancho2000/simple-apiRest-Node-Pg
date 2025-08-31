import { sequelizeConn } from '../db/config.js';
import userModel from '../models/user.js';

const User = userModel(sequelizeConn);

export const existingUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new Error(`User with email ${email} already exists`);
    };
};

