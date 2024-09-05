const argon2 = require('argon2');
const unitkerja = require('../models/unit_kerja');
const Layanan = require('../models/layanan');

/**
 * @swagger
 * tags:
 *   name: Unit Kerja
 *   description: API for managing users and associated unit kerja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UnitKerja:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: Unique identifier for the Unit Kerja
 *         nama_unit:
 *           type: string
 *           description: Name of the Unit Kerja
 *         alamat:
 *           type: string
 *           description: Address of the Unit Kerja
 *         Layanan:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nama_layanan:
 *                 type: string
 *                 description: Name of the service provided by the Unit Kerja
 *       required:
 *         - uuid
 *         - nama_unit
 *         - alamat
 */

/**
 * @swagger
 * /unitkerja:
 *   get:
 *     summary: Get all Unit Kerja or filtered Unit Kerja based on user role
 *     tags: [Unit Kerja]
 *     responses:
 *       200:
 *         description: A list of Unit Kerja along with associated Layanan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UnitKerja'
 *             examples:
 *               AdminExample:
 *                 summary: Role Admin
 *                 value: [
 *                   {
 *                     "uuid": "e13e6760-3c9b-4eeb-9f1b-35d576c8df45",
 *                     "nama_unit": "Dinas Kesehatan",
 *                     "alamat": "Jl.Merdeka No.21",
 *                     "Layanan": [
 *                       {
 *                         "nama_layanan": "Pengurusan surat"
 *                       },
 *                       {
 *                         "nama_layanan": "Customer Service"
 *                       }
 *                     ]
 *                   },
 *                   {
 *                     "uuid": "b73b5b6a-c567-4f3b-a8c7-2908c2d0c9a4",
 *                     "nama_unit": "Dinas Hukum",
 *                     "alamat": "Jl.Merdeka No.78",
 *                     "Layanan": [
 *                       {
 *                         "nama_layanan": "Pengurusan surat"
 *                       },
 *                       {
 *                         "nama_layanan": "Customer Service"
 *                       }
 *                     ]
 *                   }
 *                 ]
 *               UserExample:
 *                 summary: Role User
 *                 value: [
 *                   {
 *                     "uuid": "e13e6760-3c9b-4eeb-9f1b-35d576c8df45",
 *                     "nama_unit": "Dinas Kesehatan",
 *                     "alamat": "Jl.Merdeka No.21",
 *                     "Layanan": [
 *                       {
 *                         "nama_layanan": "Service 1"
 *                       }
 *                     ]
 *                   }
 *                 ]
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
 *             examples:
 *               ErrorExample:
 *                 summary: Example error response
 *                 value:
 *                   msg: "Internal server error"
 */



const getUnit = async (req, res) => {
    try {
        let respon;
        if(req.role === 'admin') {
            respon = await unitkerja.findAll({
                attributes: ['uuid', 'nama_unit', 'alamat'],
                include: [{
                    model: Layanan,
                    attributes: ['nama_layanan']
                }],
            });
        } else {
            respon = await unitkerja.findAll({
                where: {
                    id_user: req.id_user
                },
                attributes: [ 'nama_unit', 'alamat'],
                include: [{
                    model: Layanan,
                    attributes: ['nama_layanan']
                }],
            })
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    getUnit
}
