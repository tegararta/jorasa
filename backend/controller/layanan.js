const unitkerja = require('../models/unit_kerja');
const layanan = require('../models/layanan');

const getLayanan = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await layanan.findAll({
                attributes: ['uuid', 'nama_layanan'],
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
                attributes: ['uuid', 'nama_layanan', 'createdAt']
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createLayanan = async (req, res) => {
    const { nama_layanan } = req.body;
    try {
        await layanan.create({
            nama_layanan: nama_layanan,
            id_unit: req.unitkerja.id_unit
        });
        return res.status(201).json({ msg: "Layanan ditambahkan" });
    } catch (error) {
        console.error('Error creating layanan:', error);
        return res.status(500).json({ error: 'Failed to create layanan' });
    }
};

const getLayananById = async (req, res) => {
    try {
        const respon = await layanan.findOne({
            where: { uuid: req.params.uuid },
            attributes: [ 'uuid', 'nama_layanan'],
            include: [{
                model: unitkerja,
                attributes: ['nama_unit']
            }]
        });

        if (!respon) {
            return res.status(404).json({ msg: 'Layanan tidak tersedia' });
        }

        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateLayanan = async (req, res) => {
    const { nama_layanan } = req.body;
    try {
        const respon = await layanan.update({
            nama_layanan: nama_layanan
        }, {
            where: { uuid: req.params.uuid },
            include: [{
                model: unitkerja,
                attributes: ['nama_unit']
            }],
            attributes: [ 'nama_layanan']
        });
        if (!respon) {
            return res.status(404).json({ msg: 'Layanan tidak tersedia' });
        }
        res.status(200).json({ msg: 'Layanan berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const deleteLayanan = async (req, res) => {
    try {
        await layanan.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(204).json();
    } catch (error) {
        
        console.error('Error deleting Layanan:', error);
        res.status(500).json({ error: 'Failed to delete Layanan' });
    }
}

module.exports = {
    getLayanan,
    createLayanan,
    getLayananById,
    updateLayanan,
    deleteLayanan
}