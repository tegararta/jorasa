const argon2 = require('argon2');
const user = require('../models/user'); // Sesuaikan nama model
const unitkerja = require('../models/unit_kerja');

// Update user
const updateUser = async (req, res) => {
    const { username, password, confPassword, email } = req.body;

    // Pengecekan apakah password dan confPassword sama
    if (password && password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }

    try {
        // Temukan pengguna berdasarkan ID
        const User = await user.findOne({
            where: {
                id_user: req.params.id_user,
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

        res.status(200).json({ msg: "Pengguna berhasil diperbarui" });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Gagal memperbarui akun' });
    }
};

module.exports = {
    updateUser,
}

