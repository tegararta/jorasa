const User = require('../models/user');
const unitkerja = require('../models/unit_kerja');

const verifyUser = async(req, res, next) => {
    if(!req.session.id_user) {
        return res.status(401).json({ msg: 'Anda belum login'});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.id_user
        },
    });
    const unitKerja = await unitkerja.findOne({
        where: {
            id_user: user.id_user
        },
    });
    if(!user) {
        return res.status(404).json({ msg: 'Akun tidak ditemukan'});
    }
    req.id_user = user.id_user;
    req.role = user.role;
    req.pass = user.password
    req.unitkerja = unitKerja;
    next();
};

const userAdmin = async(req, res, next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.id_user
        },
    });
    if(user.role !== 'admin') {
        return res.status(404).json({ msg: 'Silakan hubungi pusat'});
    }
    next();
}


module.exports = {
    verifyUser,
    userAdmin,
} 