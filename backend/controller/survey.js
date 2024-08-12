const user = require('../models/user'); // Sesuaikan nama model
const survey = require('../models/survey');
const Pertanyaan = require('../models/pertanyaan');

const getSurvey = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await survey.findAll({
                attributes: ['uuid', 'url', 'judul', 'id_user', 'created_at'],
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
                attributes: ['uuid', 'url', 'judul', 'id_user', 'created_at']
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
const deleteSurveyById = async (req, res) => {
    const respon = await user.findOne({
        where: {
            uuid: req.params.uuid
        },
    })
    if (!respon) {
        return res.status(404).json({msg: "Tidak di temukan"})
    }
    try { 
        await user.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        
        res.status(204).json();
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};

module.exports = {
    getSurvey,
    createSurvey,
    update,
    deleteSurveyById,
}

