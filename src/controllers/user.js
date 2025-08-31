import bcrypt from "bcryptjs";
import { sequelizeConn } from "../db/config.js";
import userModel from "../models/user.js";

const User = userModel(sequelizeConn);
export const createUser = async (req, res) => {
    const { name, email, role, password } = req.body;
    
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    console.log(name, email, role, hashedPassword); 
    await User.create({ name, email, role, password:hashedPassword })
        .then(user => res.status(201).json(user))
        .catch(error => res.status(500).json({ error: error.message }));
};

export const getUsers = async (req, res) => {
    const users = await User.findAll()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: error.message }));
}