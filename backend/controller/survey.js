const user = require('../models/user'); // Sesuaikan nama model
const survey = require('../models/survey');
const Pertanyaan = require('../models/pertanyaan');
const pertanyaan = require('../models/pertanyaan');
const UnitKerja = require('../models/unit_kerja');

const getSurvey = async (req, res) => {
    try {
        let respon;
        const active = {
            is_active: true,
        };

        if (req.role === 'admin') {
            respon = await survey.findAll({
                where: active,
                attributes: ['uuid', 'url', 'judul', 'created_at'],
                include: [
                    {
                        model: pertanyaan,
                        attributes: ['pertanyaan'],
                        required: false,
                    },
                    {
                        model: user,
                        attributes: ['username'],
                        include: [{
                            model: UnitKerja,
                            attributes: ['nama_unit'],
                        }],
                    },
                ],
            });
        } else {
            respon = await survey.findAll({
                where: {
                    ...active,
                    id_user: req.id_user, // Hanya ambil survey milik pengguna saat ini
                },
                attributes: ['uuid', 'url', 'judul', 'created_at'],
                include: [
                    {
                        model: pertanyaan,
                        attributes: ['pertanyaan'],
                    },
                ],
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// Create survey
const createSurvey = async (req, res) => {
    const { url, id_user, judul, pertanyaan } = req.body;
    try {
        // Buat survey baru
        const newSurvey = await survey.create({
            url: url,
            judul: judul,
            id_user: req.id_user 
        });

        // Iterasi melalui array pertanyaan untuk menyimpan tiap pertanyaan
        await Promise.all(pertanyaan.map(async (q) => {
            await Pertanyaan.create({
                pertanyaan: q,
                id_survey: newSurvey.id_survey,
            });
        }));

        res.status(201).json({ msg: "Berhasil membuat survey dan pertanyaan" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Gagal membuat survey' });
    }
};



// Update user by ID
const update = async (req, res) => {
    const { judul } = req.body;
    try {
        await survey.update({
            judul: judul
        }, {
            where: { uuid: req.params.uuid }
        });
        res.status(200).json({ msg: 'Judul berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// Delete user by ID
const deleteSurvey = async (req, res) => {
    try {
        if (req.role === 'admin') {
            // Jika pengguna adalah admin, benar-benar hapus survei
            await survey.destroy({
                where: {
                    uuid: req.params.uuid
                }
            });
            res.status(204).json({ msg: "Survey berhasil dihapus" });
        } else {
            // Jika bukan admin, hanya nonaktifkan survei
            await survey.update({
                is_active: false
            }, {
                where: {
                    uuid: req.params.uuid
                }
            });
            res.status(200).json({ msg: "Survey berhasil dinonaktifkan" });
        }
    } catch (error) {
        console.error('Error deleting survey:', error);
        res.status(500).json({ error: 'Gagal menghapus survey' });
    }
};


module.exports = {
    getSurvey,
    createSurvey,
    update,
    deleteSurvey,
}

