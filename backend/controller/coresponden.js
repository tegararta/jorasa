const Coresponden = require('../models/coresponden');
const Survey = require('../models/survey');
const User = require('../models/user');
const UnitKerja = require('../models/unit_kerja')
const Jawaban = require('../models/jawaban')
const Pertanyaan = require('../models/pertanyaan')
const Saran = require('../models/saran');

/**
 * @swagger
 * tags:
 *   name: Responden
 *   description: API for managing users and associated unit kerja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coresponden:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: UUID
 *         nama:
 *           type: string
 *           description: Nama Coresponden
 *         nohp:
 *           type: string
 *           description: Nomor Coresponden
 *           example: 62145678
 *         usia:
 *           type: integer
 *           description: Umur Coresponden
 *           example: 34
 *         layanan:
 *           type: string
 *           description: Layanan yang dipilih Coresponden
 *           example: "Costumer Service"
 *         jenisKelamin:
 *           type: string
 *           description: Jenis kelamin Coresponden
 *           example: "Laki_laki"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: tanggal penilaian yang di buat
 *         Survey:
 *           $ref: '#/components/schemas/Survey'
 *         Jawaban:
 *           $ref: '#/components/schemas/Jawaban'
 *         Saran:
 *           $ref: '#/components/schemas/Saran'
 *     Survey:
 *       type: object
 *       properties:
 *         judul:
 *           type: string
 *           description: Title of the survey
 *     User:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           description: Role of the user
 *     UnitKerja:
 *       type: object
 *       properties:
 *         nama_unit:
 *           type: string
 *           description: Name of the unit
 *     Jawaban:
 *       type: object
 *       properties:
 *         bintang1:
 *           type: integer
 *           description: Penilaian dari Responden
 *           example: 5
 *         Pertanyaan1:
 *           $ref: '#/components/schemas/Pertanyaan1'
 *         bintang2:
 *           type: integer
 *           description: Penilaian dari Responden
 *           example: 4
 *         Pertanyaan2:
 *           $ref: '#/components/schemas/Pertanyaan2'
 *     Pertanyaan1:
 *       type: object
 *       properties:
 *         pertanyaan:
 *           type: string
 *           description: Pertanyaan yang dinilai
 *           example: "Gimana pelayanan kami?"
 *     Pertanyaan2:
 *       type: object
 *       properties:
 *         pertanyaan:
 *           type: string
 *           description: Pertanyaan yang dinilai
 *           example: "Gimana pelayanan kami?"
 *     Saran:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Status of the suggestion
 *           example: true
 *         saran:
 *           type: string
 *           description: Suggestion given by the Coresponden
 *           example: " Antriannya terlalu lama, Perbaiki lagi untuk skema antriannya "
 */

/**
 * @swagger
 * /coresponden:
 *   get:
 *     summary: Mengambil data coresponden 
 *     tags: [Responden]
 *     responses:
 *       200:
 *         description: A list of all Coresponden
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coresponden'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: "Kesalahan mengambil data responden"
 */

const getCoresponden = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await Coresponden.findAll({
                attributes: ['uuid', 'nama', 'nohp', 'usia', 'layanan', 'jenisKelamin', 'createdAt'],
                include: [
                    {
                        model: Survey,
                        attributes: ['judul'],
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
                        attributes: ['status', 'saran'],
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
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/**
 * @swagger
 * /coresponden:
 *   post:
 *     summary: Membuat data Coresponden
 *     tags: [Responden]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "John Doe"
 *               nohp:
 *                 type: string
 *                 example: "08123456789"
 *               usia:
 *                 type: integer
 *                 example: 30
 *               layanan:
 *                 type: string
 *                 example: "Customer Service"
 *               jenisKelamin:
 *                 type: string
 *                 example: "Perempuan"
 *               id_survey:
 *                 type: integer
 *                 example: 1
 *               user:
 *                 type: integer
 *                 example: 2
 *               ratings:
 *                 type: object
 *                 additionalProperties:
 *                   type: integer
 *                   example: 4
 *               suggestion:
 *                 type: string
 *                 example: "Pelayanan Sangat Baik"
 *     responses:
 *       201:
 *         description: Respon sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Coresponden, jawaban, dan saran berhasil disimpan"
 *       500:
 *         description: Respon kesalahan upload data responden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi Kesalahan"
 */


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
        return res.status(500).json({ error: 'Terjadi Kesalahan' });
    }
};

/**
 * @swagger
 * /coresponden/{uuid}:
 *   delete:
 *     summary: Menghapus Data Responden
 *     tags: [Responden]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the Coresponden to delete
 *     responses:
 *       204:
 *         description: Respon sukses 
 *       500:
 *         description: Respon Kesalahan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete Coresponden"
 */

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

/**
 * @swagger
 * /saran:
 *   get:
 *     summary: Mengambil data Saran
 *     tags: [Responden]
 *     responses:
 *       200:
 *         description: Respon Saran 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Saran'
 *       500:
 *         description: Respon kesalahan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */
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
                        attributes: ['uuid', 'status', 'saran'],
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
                        attributes: ['uuid', 'status','saran'],
                    }
                ],
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

/**
 * @swagger
 * /saran/{uuid}/false:
 *   patch:
 *     summary: Update status menjadi False = Saran Terlaksanakan
 *     tags: [Responden]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the Saran to update
 *     responses:
 *       200:
 *         description: Saran status updated to false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Saran status updated to false"
 *       404:
 *         description: Saran not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Saran not found"
 *       500:
 *         description: Failed to update Saran status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Failed to update Saran status"
 */

// True/False saran
const falseSaranStatus = async (req, res) => {
    try {
        const [affectedRows] = await Saran.update(
            { status: false },
            { where: { uuid: req.params.uuid } }
        );
        
        if (affectedRows === 0) {
            return res.status(404).json({ msg: 'Saran not found' });
        }

        res.status(200).json({ msg: 'Saran status updated to false' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/**
 * @swagger
 * /saran/{uuid}/true:
 *   patch:
 *     summary: Update status menjadi true = belum Terlaksanakan
 *     tags: [Responden]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the Saran to update
 *     responses:
 *       200:
 *         description: Saran status updated to true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Saran status updated to true"
 *       404:
 *         description: Saran not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Saran not found"
 *       500:
 *         description: Failed to update Saran status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Failed to update Saran status"
 */

const activateSaranStatus = async (req, res) => {
    try {
        const [affectedRows] = await Saran.update(
            { status: true },
            { where: { uuid: req.params.uuid } }
        );
        
        if (affectedRows === 0) {
            return res.status(404).json({ msg: 'Saran not found' });
        }

        res.status(200).json({ msg: 'Saran status updated to true' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/**
 * @swagger
 * /biodata:
 *   get:
 *     summary: Mengambil Biodata Responden
 *     tags: [Responden]
 *     responses:
 *       200:
 *         description: Biodata Responden
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coresponden'
 *       500:
 *         description: Respon kesalahan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */


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
    getBiodata,
    falseSaranStatus,
    activateSaranStatus
}