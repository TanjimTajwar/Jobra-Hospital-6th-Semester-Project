const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "jobra_secret_key");
        req.user = decoded;     // { id, role }
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};