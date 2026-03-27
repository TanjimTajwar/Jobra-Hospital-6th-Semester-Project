const model = require('../models/patientModel');

exports.all = (req, res) => {

    model.getAllPatients((err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};
