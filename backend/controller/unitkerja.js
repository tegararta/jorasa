const argon2 = require('argon2');
const unitkerja = require('../models/unit_kerja');
const user = require('../models/user');

const getUnit = async (req, res) => {
    try {
        let respon;
        if(req.role === 'admin') {
            respon = await unitkerja.findAll({
                include: [{
                    model: user,
                    attributes: ['username']
                }],
                attributes: ['uuid', 'nama_unit', 'alamat', 'id_user']
            });
        } else {
            if (!req.id_user) { 
                return res.status(400).json({ msg: 'User ID is required' });
            }

            respon = await unitkerja.findAll({
                where: {
                    id_user: req.id_user
                },
                include: [{
                    model: user,
                    attributes: ['username']
                }],
                attributes: ['uuid', 'nama_unit', 'alamat', 'id_user']
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateUnit = async (req, res) => {
    const { username, password, confPassword, email } = req.body;
    // Pengecekan apakah password dan confPassword sama
    if (password && password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }

    try {
        // Temukan pengguna berdasarkan ID
        const User = await user.findOne({
            where: {
                id_user: req.id_user
            },
        });

        if (!User) {
            return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }

        // Variabel untuk menyimpan data yang akan diperbarui
        const updatedData = {
            username: username || User.username,
            email: email || User.email,
            updatedAt: new Date()
        };

        // Jika password ada, hash password baru
        if (password) {
            updatedData.password = await argon2.hash(password);
        } else {
            updatedData.password = User.password; // Menggunakan password lama jika tidak ada perubahan
        }

        // Update informasi pengguna
        await User.update(updatedData);

        res.status(200).json({ msg: "Berhasil diperbarui" });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Gagal memperbarui akun' });
    }
};

module.exports = {
    getUnit,
    updateUnit,
}
