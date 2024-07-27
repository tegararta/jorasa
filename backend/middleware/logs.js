const logRequest = (req, res, next) => {
    console.log(" Request PATH: ", req.path);
    next();
}

module.exports = logRequest;
