const User = require('../models/user'); // Sesuaikan nama model
const survey = require('../models/survey');
const Pertanyaan = require('../models/pertanyaan');
const UnitKerja = require('../models/unit_kerja');
const Layanan = require('../models/layanan');

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
                        model: Pertanyaan,
                        attributes: ['pertanyaan'],
                        required: false,
                    },
                    {
                        model: User,
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
                        model: User,
                        attributes: ['role'],
                        include: [{
                            model: UnitKerja,
                            attributes: ['nama_unit'],
                        }],
                    },
                    {
                        model: Pertanyaan,
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



// Update User by ID
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

const getSurveyuuid = async (req, res) => {
    try {
        const Survey = await survey.findOne({
            where: { url: req.params.uuid },
            attributes: ['url', 'id_survey', 'id_user', 'judul', 'created_at'],
            include: [
                {
                    model: Pertanyaan,
                    attributes: ['uuid', 'pertanyaan']
                },
                {
                    model: User,
                    attributes: ['role'],
                    include: [{
                        model: UnitKerja,
                        attributes: ['nama_unit'],
                        include: [{
                            model: Layanan,
                            attributes: ['nama_layanan']
                        }]
                    }],
                },
            ],
        });
        res.status(200).json(Survey);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete User by ID
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
    getSurveyuuid,
    deleteSurvey,
}

