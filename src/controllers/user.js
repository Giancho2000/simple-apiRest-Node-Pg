import bcrypt from "bcryptjs";
import { sequelizeConn } from "../db/config.js";
import userModel from "../models/user.js";

const User = userModel(sequelizeConn);
export const createUser = async (req, res) => {
    const { name, email, role, password } = req.body;
    
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    await User.create({ name, email, role, password:hashedPassword })
        .then(user => res.status(201).json({
            msg: 'User created successfully',
            user}))
        .catch(error => res.status(500).json({ error: error.message }));
};

export const getUsers = async (req, res) => {
    const users = await User.findAll()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: error.message }));
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id)
    .then(user => {
        if (user) {
            const finalUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
            res.json(finalUser);
        } else {
            res.status(404).json({ msg: `No user found with id ${id}` });
        }
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ msg: `No user found with id ${id}` });
    }

    const updatedFields = {};
    
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (role) updatedFields.role = role;

    if (password) {
      const salt = bcrypt.genSaltSync();
      updatedFields.password = bcrypt.hashSync(password, salt);
    }

    await user.update(updatedFields)
        .then(updatedUser => res.json({updatedFields}))
        .catch(error => res.status(500).json({ error: error.message }));
}

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ msg: `No user found with id ${id}` });
    }
    await user.destroy()
        .then(() => res.json({ msg: `User with id ${id} deleted` }))
        .catch(error => res.status(500).json({ error: error.message }));
}