const { Op } = require('sequelize');
const argon2 = require('argon2');
const user = require('../models/user'); // Sesuaikan nama model
const Unitkerja = require('../models/unit_kerja');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users and associated unit kerja
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mengambil semua data Dinas kecuali admin
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                     description: The user's UUID
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   username:
 *                     type: string
 *                     description: The user's username
 *                     example: "kesehatan"
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                     example: "kesehatan@example.com"
 *                   role:
 *                     type: string
 *                     description: The user's role
 *                     example: "user"
 *                   unitkerja:
 *                     type: object
 *                     properties:
 *                       nama_unit:
 *                         type: string
 *                         description: Unit kerja name
 *                         example: "Dinas Kesehatan"
 *                       alamat:
 *                         type: string
 *                         description: Unit kerja address
 *                         example: "Jl. Contoh Alamat No. 123"
 *       500:
 *         description: Failed to fetch users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch users"
 */

const getUsers = async (req, res) => {
    try {
        const response = await user.findAll({
            where: {
                role: {
                    [Op.ne]: 'admin' // Exclude users with the role of 'admin'
                }
            },
            include: {
                model: Unitkerja,
                attributes: ['nama_unit', 'alamat']
            },
            attributes: ['uuid', 'username', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     summary: Get user by UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: The user's UUID
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 username:
 *                   type: string
 *                   description: The user's username
 *                   example: "kesehatan"
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: "kesehatan@example.com"
 *                 role:
 *                   type: string
 *                   description: The user's role
 *                   example: "user"
 *                 unitkerja:
 *                   type: object
 *                   properties:
 *                     nama_unit:
 *                       type: string
 *                       description: Unit kerja name
 *                       example: "Dinas Kesehatan"
 *                     alamat:
 *                       type: string
 *                       description: Unit kerja address
 *                       example: "Jl. Contoh Alamat No. 123"
 *       500:
 *         description: Failed to fetch user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user"
 */


// Get user by ID
const getUserById = async (req, res) => {
    try {
        const respon = await user.findOne({
            where: {
                uuid: req.params.uuid
            },
            attributes:['uuid', 'username', 'email', 'role'],
            include: {
                model: Unitkerja,
                attributes: ['nama_unit', 'alamat']
            },
        });
        res.status(200).json(respon);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Menambahkan akun dinas
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "hukum"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               confPassword:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "hukum@example.com"
 *               role:
 *                 type: string
 *                 example: "user"
 *               nama_unit:
 *                 type: string
 *                 description: Unit kerja name (only for non-admin roles)
 *                 example: "Dinas Hukum"
 *               alamat:
 *                 type: string
 *                 description: Unit kerja address (only for non-admin roles)
 *                 example: "Jl. Contoh Alamat No. 789"
 *     responses:
 *       201:
 *         description: Respon sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Akun dinas berhasil ditambahkan"
 *       400:
 *         description: Respon password yang di input tidak sama
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Kata sandi tidak cocok"
 *       500:
 *         description: Respon gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Kesalahan membuat akun"
 */


// Create a new user
const createUsers = async (req, res) => {
    const { username, password, confPassword, email, role, nama_unit, alamat } = req.body;
    
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }
    const hashPasswd = await argon2.hash(password);

    if (role === "admin") {
        await user.create({
            username: username,
            password: hashPasswd,
            email: email,
            role: role,
        });
        res.status(201).json({ msg: "Akun admin berhasil ditambahkan" });
    } else{
        try {
            // Membuat user terlebih dahulu
            const newUser = await user.create({
                username: username,
                password: hashPasswd,
                email: email,
                role: role
            });
    
            // Menggunakan id_user dari user yang baru dibuat untuk membuat unit_kerja
            await Unitkerja.create({
                nama_unit: nama_unit,
                alamat: alamat,
                id_user: newUser.id_user  
            });
    
            res.status(201).json({ msg: "Akun dinas berhasil ditambahkan" });
        } catch (error) {
            console.error('Terjadi kesalahan membuat akun:', error);
            res.status(500).json({ error: 'Kesalahan membuat akun' });
        }
    }
    
};

/**
 * @swagger
 * /users/{uuid}:
 *   put:
 *     summary: Update data berdasarkan UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "updateduser"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               confPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               email:
 *                 type: string
 *                 example: "updateduser@example.com"
 *               role:
 *                 type: string
 *                 example: "dinas"
 *               unit_kerjas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nama_unit:
 *                       type: string
 *                       example: "Unit Kerja Updated"
 *                     alamat:
 *                       type: string
 *                       example: "Jl. Alamat Baru No. 321"
 *     responses:
 *       200:
 *         description: Respon sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Pengguna berhasil diperbarui"
 *       400:
 *         description: Respon password yang di input tidak sama
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Kata sandi tidak cocok"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Pengguna tidak ditemukan"
 *       500:
 *         description: Respon kesalahan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Gagal memperbarui akun"
 */


// Update user by ID
const update = async (req, res) => {
    const { username, password, confPassword, email, role, unit_kerjas } = req.body;

    // Validate password and confirm password
    if (password && password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }

    try {
        // Find the user by UUID
        const User = await user.findOne({
            where: { uuid: req.params.uuid },
            include: {
                model: Unitkerja, 
            }
        });

        if (!User) {
            return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }

        // Initialize the update data object
        const updatedData = {
            username: username || User.username,
            email: email || User.email,
            role: role || User.role,
            updatedAt: new Date()
        };

        // Handle password update
        if (password) {
            updatedData.password = await argon2.hash(password);
        }

        // If the user has admin role, they can update the associated unit_kerjas
        if (req.role === 'admin' && unit_kerjas && unit_kerjas.length > 0) {
            const unitKerja = unit_kerjas[0];

            // Update the user's unit_kerjas if provided
            if (User.unit_kerjas && User.unit_kerjas.length > 0) {
                await User.unit_kerjas[0].update({
                    nama_unit: unitKerja.nama_unit || User.unit_kerjas[0].nama_unit,
                    alamat: unitKerja.alamat || User.unit_kerjas[0].alamat,
                });
            } else {
                // If there is no existing unit_kerja, create a new one
                await Unitkerja.create({
                    nama_unit: unitKerja.nama_unit,
                    alamat: unitKerja.alamat,
                    id_user: User.id_user,
                });
            }
        }

        // Update the user information
        await User.update(updatedData);

        res.status(200).json({ msg: "Pengguna berhasil diperbarui" });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Gagal memperbarui akun' });
    }
};

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Delete
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the user
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       204:
 *         description: Successfully deleted user
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */

// Delete user by ID
const deleteUsersById = async (req, res) => {
    try {
        // Check if the user exists
        const userToDelete = await user.findOne({
            where: {
                uuid: req.params.uuid
            }
        });

        if (!userToDelete) {
            return res.status(404).json({ msg: "Pengguna tidak di temukan" });
        }

        // Perform the deletion
        await user.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(204).json();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUsers,
    update,
    deleteUsersById,
}

