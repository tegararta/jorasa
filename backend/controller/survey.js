const user = require('../models/user'); // Sesuaikan nama model
const survey = require('../models/survey');
const Pertanyaan = require('../models/pertanyaan');
const pertanyaan = require('../models/pertanyaan');
const UnitKerja = require('../models/unit_kerja');

const getSurvey = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await survey.findAll({
                attributes: ['uuid', 'url', 'judul', 'id_user', 'created_at'],
                include: [
                    {
                        model: pertanyaan,
                        attributes: ['pertanyaan'],
                        required: false,
                    },
                    {
                        model: user, // Menyertakan User untuk mengakses UnitKerja
                        attributes: ['id_user'], // Atribut yang diambil dari User
                        include: [{
                            model: UnitKerja,
                            attributes: ['nama_unit'], // Atribut yang diambil dari UnitKerja
                        }],
                    },
                ],
            });
        } else {
            respon = await survey.findAll({
                where: {
                    id_user: req.id_user,
                },
                attributes: ['url', 'judul', 'created_at'],
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
    const respon = await survey.findOne({
        where: {
            uuid: req.params.uuid
        },
    })
    console.log(respon);
    
    if (!respon) {
        return res.status(404).json({msg: "Tidak di temukan"})
    }
    try { 
        await survey.destroy({
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
    deleteSurvey,
}

