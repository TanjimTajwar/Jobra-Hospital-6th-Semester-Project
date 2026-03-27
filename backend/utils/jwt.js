const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        "jobra_secret_key",
        { expiresIn: "7d" }
    );
};