const User = require('../models/user');
const argon2 = require('argon2');

const login = async(req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        },
    });
    if (!user) return res.status(404).json({ msg: 'Akun belum terdaftar'});
    const verify = await argon2.verify(user.password, req.body.password);
    if (!verify) return res.status(401).json({ msg: 'Password salah'});
    req.session.id_user = user.uuid;
    const uuid = user.uuid;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    console.log(uuid);
    res.status(200).json({
        uuid,
        username,
        email,
        role
    });
};

const userOn = async (req, res) => {
    if(!req.session.id_user) {
        return res.status(401).json({ msg: 'Anda belum login'});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.id_user
        },
        attributes: ['uuid', 'username', 'email', 'role']
    });
    if(!user) {
        return res.status(404).json({ msg: 'Akun tidak ditemukan'});
    }
    res.status(200).json(user);
}

const logout = (req, res) => {
    req.session.destroy((err) =>{
        if(err) {
            return res.status(400).json({ msg: 'Gagal logout'});
        }
        res.status(200).json({ msg: 'Anda telah logout'});
    })
}

module.exports = { login, logout, userOn }; 