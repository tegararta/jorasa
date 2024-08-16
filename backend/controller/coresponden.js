const Coresponden = require('../models/coresponden');
const survey = require('../models/survey');

const getCoresponden = async (req, res) => {
    try {
        let respon;
        if (req.role === 'admin') {
            respon = await Coresponden.findAll({
                attributes: ['uuid', 'nama', 'usia', 'layanan'],
                include: [{
                    model: survey,
                    attributes: ['uuid'],
                    required: false
                },
                {
                    model: user,
                }
            ]
            });
        } else {
            respon = await Coresponden.findAll({
                where: {
                    uuid: req.Coresponden.uuid
                },
                include: [{
                    model: unitkerja,
                    attributes: ['nama_unit']
                }],
                attributes: ['uuid', 'nama_Coresponden', 'createdAt']
            });
        }
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createCoresponden = async (req, res) => {
    const { nama_Coresponden } = req.body;
    try {
        await Coresponden.create({
            nama_Coresponden: nama_Coresponden,
            id_unit: req.unitkerja.id_unit
        });
        return res.status(201).json({ msg: "Coresponden ditambahkan" });
    } catch (error) {
        console.error('Error creating Coresponden:', error);

        // Kirim respon jika terjadi kesalahan
        return res.status(500).json({ error: 'Failed to create Coresponden' });
    }
};

const getCorespondenById = async (req, res) => {
    try {
        const respon = await Coresponden.findOne({
            where: { uuid: req.params.uuid },
            include: [{
                model: unitkerja,
                attributes: ['uuid', 'nama_unit']
            }],
            attributes: [ 'uuid', 'nama_Coresponden']
        });

        if (!respon) {
            return res.status(404).json({ msg: 'Coresponden tidak tersedia' });
        }

        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateCoresponden = async (req, res) => {
    const { nama_Coresponden } = req.body;
    try {
        const respon = await Coresponden.update({
            nama_Coresponden: nama_Coresponden
        }, {
            where: { uuid: req.params.uuid },
            include: [{
                model: unitkerja,
                attributes: ['nama_unit']
            }],
            attributes: [ 'nama_Coresponden']
        });
        if (!respon) {
            return res.status(404).json({ msg: 'Coresponden tidak tersedia' });
        }
        res.status(200).json({ msg: 'Coresponden berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

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

module.exports = {
    getCoresponden,
    createCoresponden,
    getCorespondenById,
    updateCoresponden,
    deleteCoresponden
}