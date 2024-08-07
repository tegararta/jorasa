const user = require('../models/user'); // Sesuaikan nama model
const survey = require('../models/survey');
const Pertanyaan = require('../models/pertanyaan');

const getSurvey = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await survey.findAll({
                attributes: ['uuid', 'url', 'id_user', 'created_at'],
                include: [{
                    model: user,
                    attributes: ['id_user', 'username'],
                    required: false
                }]
            });
        } else {
            respon = await survey.findAll({
                where: {
                    id_user: req.id_user
                },
                include: [{
                    model: user,
                    attributes: ['id_user', 'username']
                }],
                attributes: ['uuid', 'url', 'id_user', 'created_at']
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const respon = await survey.findOne({
            where: {
                id_user: req.params.uuid
            },
            attributes:['uuid', 'username', 'email', 'role']
        });
        res.status(200).json(respon);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

// Create a new user
const createSurvey = async (req, res) => {
    const { url, id_user, pertanyaan } = req.body;

    try {
        const newSurvey = await survey.create({
            url: url,
            id_user: req.id_user 
        });

        await Pertanyaan.create({
            id_survey: newSurvey.id_survey,
            pertanyaan: pertanyaan,
        })

        res.status(201).json({ msg: "Berhasil" });
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Failed to create ' });
    }
};


// Update user by ID
const update = async (req, res) => {
    const { username, password, confPassword, email, role } = req.body;

    // Pengecekan apakah password dan confPassword sama
    if (password && password !== confPassword) {
        return res.status(400).json({ msg: "Kata sandi tidak cocok" });
    }

    try {
        // Temukan pengguna berdasarkan ID
        const User = await user.findOne({
            where: {
                uuid: req.params.id_user,
            },
        });

        if (!User) {
            return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }

        // Variabel untuk menyimpan data yang akan diperbarui
        const updatedData = {
            username: username || User.username,
            email: email || User.email,
            role: role || User.role,
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


// Delete user by ID
const deleteSurveyById = async (req, res) => {
    const respon = await user.findOne({
        where: {
            uuid: req.params.id_user
        },
    })
    if (!respon) {
        return res.status(404).json({msg: "Tidak di temukan"})
    }
    try { 
        await user.destroy({
            where: {
                uuid: req.params.id_user
            }
        });
        
        res.status(201).json({ msg: "Berhasil dihapus" });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};

module.exports = {
    getSurvey,
    getUserById,
    createSurvey,
    update,
    deleteSurveyById,
}

