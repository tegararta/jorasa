const Coresponden = require('../models/coresponden');
const Survey = require('../models/survey');
const User = require('../models/user');
const UnitKerja = require('../models/unit_kerja')
const Jawaban = require('../models/jawaban')
const Pertanyaan = require('../models/pertanyaan')
const Saran = require('../models/saran');

const getCoresponden = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await Coresponden.findAll({
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin', 'createdAt'],
                include: [
                    {
                        model: Survey,
                        attributes: ['judul', 'uuid', 'id_user'],
                        required: false,
                        include: [
                            {
                                model: User,
                                attributes: ['role'],
                                include: [
                                    {
                                        model: UnitKerja,
                                        attributes: ['nama_unit'],
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: Jawaban,
                        attributes: ['bintang'],
                        include: [
                            {
                                model: Pertanyaan,
                                attributes: ['pertanyaan']
                            }
                        ]
                    },
                    {
                        model: Saran,
                        attributes: ['saran'],
                    }
                ],
            });
        } else {
            respon = await Coresponden.findAll({
                where: {
                    user: req.id_user,
                },
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin', 'createdAt'],
                include: [
                    {
                        model: Survey,
                        attributes: ['judul', 'uuid'],
                        required: false,
                    },
                    {
                        model: Jawaban,
                        attributes: ['bintang'],
                        include: [
                            {
                                model: Pertanyaan,
                                attributes: ['pertanyaan']
                            }
                        ]
                    },
                    {
                        model: Saran,
                        attributes: ['saran'],
                    }
                ],
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createCoresponden = async (req, res) => {
    const { nama, nohp, usia, layanan, jenisKelamin, id_survey, user, ratings, suggestion } = req.body;

    try {
        // Buat Coresponden
        const coresponden = await Coresponden.create({
            nama,
            nohp,
            usia,
            layanan,
            jenisKelamin,
            id_survey,
            user,
        });

        // Ambil data pertanyaan dari survey berdasarkan id_survey
        const survey = await Survey.findOne({
            where: { id_survey },
            include: [{ model: Pertanyaan, as: 'pertanyaans' }]
        });

        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }

        // Buat Jawaban untuk setiap pertanyaan
        const jawabanPromises = Object.keys(ratings).map(async (questionIndex) => {
            const rating = ratings[questionIndex];
            const pertanyaan = survey.pertanyaans[questionIndex]; // Ambil pertanyaan yang sesuai

            if (pertanyaan) {
                return Jawaban.create({
                    id_pertanyaan: pertanyaan.id_pertanyaan,
                    id_coresponden: coresponden.id_coresponden,
                    bintang: rating,
                });
            }
        });

        // Buat Saran
        const saran = await Saran.create({
            id_coresponden: coresponden.id_coresponden,
            saran: suggestion,
            status: true,
        });
        await Promise.all(jawabanPromises, saran);


        return res.status(201).json({ msg: "Coresponden, jawaban, dan saran berhasil disimpan" });
    } catch (error) {
        console.error('Error creating Coresponden:', error);
        return res.status(500).json({ error: 'Failed to create Coresponden' });
    }
};

const deleteCoresponden = async (req, res) => {
    try {
        await Coresponden.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(204).json();
    } catch (error) {

        console.error('Error deleting Coresponden:', error);
        res.status(500).json({ error: 'Failed to delete Coresponden' });
    }
}

// Menampilkan hanya saran
const getSaran = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await Coresponden.findAll({
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin', 'createdAt'],
                include: [
                    {
                        model: Saran,
                        attributes: ['uuid', 'saran'],
                    },
                    {
                    model: Survey,
                    attributes: ['judul'],
                    include: {
                        model: User,
                        attributes: ['role'],
                        include:{
                            model: UnitKerja,
                            attributes: ['nama_unit']
                        }
                    }
                    }
                ],
            });
        } else {
            respon = await Coresponden.findAll({
                where: {
                    user: req.id_user,
                },
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin', 'createdAt'],
                include: [
                    {
                        model: Saran,
                        attributes: ['uuid', 'saran'],
                    }
                ],
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// Menampilkan Biodata responden
const getBiodata = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await Coresponden.findAll({
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin', 'createdAt'],
                include: {
                    model: Survey,
                    attributes: ['judul'],
                    include: {
                        model: User,
                        attributes: ['role'],
                        include:{
                            model: UnitKerja,
                            attributes: ['nama_unit']
                        }
                    }

                }
            })
        } else {
            respon = await Coresponden.findAll({
                where: {
                    user: req.id_user,
                },
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin','createdAt'],
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getCoresponden,
    createCoresponden,
    deleteCoresponden,
    getSaran,
    getBiodata
}