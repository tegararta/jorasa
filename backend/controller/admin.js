const { Op } = require('sequelize');
const argon2 = require('argon2');
const user = require('../models/user'); // Sesuaikan nama model
const Unitkerja = require('../models/unit_kerja');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API untuk mengelola pengguna
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - role
 *       properties:
 *         uuid:
 *           type: string
 *           description: UUID pengguna
 *         username:
 *           type: string
 *           description: Nama pengguna
 *         email:
 *           type: string
 *           description: Email pengguna
 *         role:
 *           type: string
 *           description: Role pengguna
 *         unit_kerjas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UnitKerja'
 *       example:
 *         uuid: '454407b6-201d-41ef-9fda-5370d7b9f0d0'
 *         username: 'kesehatan'
 *         email: 'kesehatan@example.com'
 *         role: 'user'
 *         unit_kerjas:
 *           - nama_unit: 'Lembaga Kesehatan'
 *             alamat: 'Jl. Surya No. 2'
 *   
 *     UnitKerja:
 *       type: object
 *       required:
 *         - nama_unit
 *         - alamat
 *       properties:
 *         nama_unit:
 *           type: string
 *           description: Nama unit kerja
 *         alamat:
 *           type: string
 *           description: Alamat unit kerja
 *       example:
 *         nama_unit: 'Lembaga Kesehatan'
 *         alamat: 'Jl. Surya No. 2'
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - confPassword
 *         - email
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: Nama pengguna
 *         password:
 *           type: string
 *           description: Kata sandi pengguna
 *         confPassword:
 *           type: string
 *           description: Konfirmasi kata sandi
 *         email:
 *           type: string
 *           description: Email pengguna
 *         role:
 *           type: string
 *           description: Role pengguna (misalnya: admin, user)
 *         unit_kerjas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UnitKerja'
 *       example:
 *         username: 'raharja'
 *         password: '123456'
 *         confPassword: '123456'
 *         email: 'raharja@gmail.com'
 *         role: 'user'
 *         unit_kerjas:
 *           - nama_unit: 'Jasa Raharja'
 *             alamat: 'Jl. Merdeka No. 56'
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nama pengguna (opsional)
 *         password:
 *           type: string
 *           description: Kata sandi pengguna (opsional)
 *         confPassword:
 *           type: string
 *           description: Konfirmasi kata sandi (opsional)
 *         email:
 *           type: string
 *           description: Email pengguna (opsional)
 *         role:
 *           type: string
 *           description: Role pengguna (opsional)
 *         unit_kerjas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UnitKerja'
 *       example:
 *         username: 'hukum_updated'
 *         email: 'hukum_new@gmail.com'
 *         role: 'user'
 *         unit_kerjas:
 *           - nama_unit: 'Lembaga Hukum Baru'
 *             alamat: 'Jl. Merdeka No. 25'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan daftar pengguna
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar semua pengguna (kecuali admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Gagal mendapatkan pengguna
 */

/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     summary: Mendapatkan pengguna berdasarkan UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID pengguna
 *     responses:
 *       200:
 *         description: Detail pengguna
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Gagal mendapatkan pengguna
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Membuat pengguna baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Pengguna berhasil dibuat
 *       400:
 *         description: Kata sandi tidak cocok
 *       500:
 *         description: Gagal membuat pengguna
 */

/**
 * @swagger
 * /users/{uuid}:
 *   patch:
 *     summary: Memperbarui pengguna berdasarkan UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID pengguna
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Pengguna berhasil diperbarui
 *       400:
 *         description: Kata sandi tidak cocok
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Gagal memperbarui pengguna
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
 *     summary: Menghapus pengguna berdasarkan UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID pengguna
 *     responses:
 *       204:
 *         description: Pengguna berhasil dihapus
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Gagal menghapus pengguna
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

