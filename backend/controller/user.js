const { user } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Login user
const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Validasi input
        if (!emailOrUsername || !password) {
            return res.status(400).json({ error: 'Email/Username dan kata sandi harus diisi' });
        }

        // Mencari pengguna berdasarkan email atau username
        const users = await user.findAll({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        if (users.length === 0) {
            return res.status(404).json({ error: 'Akun tidak tersedia' });
        }

        const userRecord = users[0];
        const isValidPassword = await bcrypt.compare(password, userRecord.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Kata sandi salah' });
        }

        const { id: userId, username, email } = userRecord;
        const token = jwt.sign({ userId, username, email }, process.env.ACCESS, { expiresIn: '15s' });
        const fresh = jwt.sign({ userId, username, email }, process.env.REFFACCESS, { expiresIn: '1d' });

        await user.update({ fresh }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', fresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Pastikan ini hanya aktif di production
            maxAge: 24 * 60 * 60 * 1000 // 1 hari dalam milidetik
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes:['id_user', 'username', 'email']
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

//  Get all users
// const getAllUsers = async (req, res) => {
//     try {
//         const akunList = await user.findAll();
//         res.json(akunList);const getAllUsers = async (req, res) => {
//             try {
//                 const akunList = await user.findAll();
//                 res.json(akunList);
//             } catch (error) {
//                 console.error('Error fetching accounts:', error);
//                 res.status(500).json({ error: 'Failed to fetch accounts' });
//             }
//         };
//     } catch (error) {
//         console.error('Error fetching accounts:', error);
//         res.status(500).json({ error: 'Failed to fetch accounts' });
//     }
// };

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const akun = await user.findByPk(req.params.id_user);
        if (akun) {
            res.json(akun);
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        console.error('Error fetching account:', error);
        res.status(500).json({ error: 'Failed to fetch account' });
    }
};

// Create a new user
const createUsers = async (req, res) => {
    const { username, password, confPassword, email, id_unit, role } = req.body;
    
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }
    
    try {
        const salt = await bcrypt.genSalt();
        const hashPasswd = await bcrypt.hash(password, salt);
        
        const newAkun = await user.create({
            username: username,
            password: hashPasswd,
            email: email,
            id_unit: id_unit,
            role: role
        });
        
        res.status(201).json({ msg: "Berhasil", newAkun });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};


// Update user by ID
const updateUsersById = async (req, res) => {
    try {
        const [updated] = await user.update(req.body, {
            where: { id_user: req.params.id_user }
        });
        if (updated) {
            const updatedAkun = await user.findByPk(req.params.id_user);
            res.json(updatedAkun);
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Failed to update account' });
    }
};

// Delete user by ID
const deleteUsersById = async (req, res) => {
    try {
        const deleted = await user.destroy({
            where: { id_user: req.params.id_user }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};


module.exports = {
    loginUser,
    getUsers,
    // getAllUsers,
    getUserById,
    createUsers,
    updateUsersById,
    deleteUsersById
}
