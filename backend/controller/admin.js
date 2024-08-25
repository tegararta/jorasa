const { Op } = require('sequelize');
const argon2 = require('argon2');
const user = require('../models/user'); // Sesuaikan nama model
const Unitkerja = require('../models/unit_kerja');

const getUsers = async (req, res) => {
    try {
        const response = await user.findAll({
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

    // Pengecekan apakah password dan confPassword sama
    if (password && password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }

    try {
        // Temukan pengguna berdasarkan UUID
        const User = await user.findOne({
            where: {
                uuid: req.params.uuid,
            },
            include: {
                model: unit_kerjas // Pastikan untuk menyertakan unit_kerja jika relasi sudah diatur
            }
        });

        if (!User) {
            return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }

        if (req.role === 'admin') {
            // Jika admin, dapat memperbarui username, email, role, nama_unit, dan alamat
            const updatedData = {
                username: username || User.username,
                email: email || User.email,
                role: role || User.role,
                updatedAt: new Date()
            };

            // Handle unit_kerjas jika ada
            if (unit_kerjas && unit_kerjas.length > 0) {
                const unitKerja = unit_kerjas[0];
                updatedData.nama_unit = unitKerja.nama_unit || User.unit_kerja.nama_unit;
                updatedData.alamat = unitKerja.alamat || User.unit_kerja.alamat;
                
                // Update relasi unit_kerja jika ada
                await User.unit_kerja.update({
                    nama_unit: unitKerja.nama_unit || User.unit_kerja.nama_unit,
                    alamat: unitKerja.alamat || User.unit_kerja.alamat
                });
            }

            // Jika password ada, hash password baru
            if (password) {
                updatedData.password = await argon2.hash(password);
            } else {
                updatedData.password = User.password; // Menggunakan password lama jika tidak ada perubahan
            }

            await User.update(updatedData);
        } else {
            // Jika pengguna biasa, hanya perbarui password
            if (password) {
                await User.update({
                    password: await argon2.hash(password),
                    updatedAt: new Date()
                });
            } else {
                return res.status(400).json({ msg: "Password harus diisi untuk memperbarui" });
            }
        }

        res.status(200).json({ msg: "Pengguna berhasil diperbarui" });

    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Gagal memperbarui akun' });
    }
};



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

