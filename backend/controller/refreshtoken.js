const { where } = require('sequelize');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFFACCESS, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].id_user;
            const username = user[0].username;
            const email = user[0].email;
            const accesstoken = jwt.sign({ userId, username, email }, process.env.ACCESS, {
                expiresIn: '15s'
            });
            res.json({ accesstoken });
        });
    } catch (error) {
        console.log(error);
    };
};

module.exports = { refreshToken };