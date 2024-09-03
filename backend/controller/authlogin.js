const UnitKerja = require('../models/unit_kerja');
const User = require('../models/user');
const argon2 = require('argon2');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "kesehatan"
 *               password:
 *                 type: string
 *                 example: "12"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   example: "user-uuid"
 *                 username:
 *                   type: string
 *                   example: "kesehatan"
 *                 email:
 *                   type: string
 *                   example: "kesehatan@example.com"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       401:
 *         description: Unauthorized - Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Password salah"
 *       404:
 *         description: Not Found - User not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Akun belum terdaftar"
 */
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

/**
 * @swagger
 * /userOn:
 *   get:
 *     summary: Get user information
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   example: "user-uuid"
 *                 username:
 *                   type: string
 *                   example: "kesehatan"
 *                 email:
 *                   type: string
 *                   example: "kesehatan@example.com"
 *                 role:
 *                   type: string
 *                   example: "kesehatan"
 *                 unitKerja:
 *                   type: object
 *                   properties:
 *                     nama_unit:
 *                       type: string
 *                       example: "Lembaga Kesehatan"
 *       401:
 *         description: Unauthorized - User not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Anda belum login"
 *       404:
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Akun tidak ditemukan"
 */
const userOn = async (req, res) => {
    if(!req.session.id_user) {
        return res.status(401).json({ msg: 'Anda belum login'});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.id_user
        },
        attributes: ['uuid', 'username', 'email', 'role'],
        include: {
            model: UnitKerja,
            attributes: ['nama_unit']
        }
    });
    if(!user) {
        return res.status(404).json({ msg: 'Akun tidak ditemukan'});
    }
    res.status(200).json(user);
}

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Anda telah logout"
 *       400:
 *         description: Bad Request - Logout failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Gagal logout"
 */
const logout = (req, res) => {
    req.session.destroy((err) =>{
        if(err) {
            return res.status(400).json({ msg: 'Gagal logout'});
        }
        res.status(200).json({ msg: 'Anda telah logout'});
    })
}

module.exports = { login, logout, userOn };
