const unitkerja = require('../models/unit_kerja');
const layanan = require('../models/layanan');

const getLayanan = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await layanan.findAll({
                attributes: ['uuid', 'nama_layanan', 'id_unit'],
                include: [{
                    model: unitkerja,
                    attributes: ['nama_unit'],
                    required: false
                }]
            });
        } else {
            respon = await layanan.findAll({
                where: {
                    id_unit: req.unitkerja.id_unit
                },
                include: [{
                    model: unitkerja,
                    attributes: ['nama_unit']
                }],
                attributes: ['uuid', 'nama_layanan', 'id_unit']
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createLayanan = async (req, res) => {
    const { nama_layanan, id_unit} = req.body;
    try {
        await layanan.create({
            nama_layanan: nama_layanan,
            id_unit: req.unitkerja.id_unit
        });
        return res.status(201).json({ msg: "Layanan ditambahkan" });
    } catch (error) {
        console.error('Error creating layanan:', error);

        // Kirim respon jika terjadi kesalahan
        return res.status(500).json({ error: 'Failed to create layanan' });
    }
};

const getLayananById = async (req, res) => {
    try {
        const respon = await layanan.findOne({
            where: { uuid: req.params.uuid },
            include: [{
                model: unitkerja,
                attributes: ['nama_unit']
            }],
            attributes: ['uuid', 'nama_layanan']
        });

        if (!respon) {
            return res.status(404).json({ msg: 'Layanan tidak tersedia' });
        }

        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getLayanan,
    createLayanan,
    getLayananById,
}