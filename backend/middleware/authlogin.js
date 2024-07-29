const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded.username;
        req.email = decoded.email;
        next();
    });
};

module.exports = { verifytoken };