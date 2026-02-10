const model = require('../models/complaintModel');

// patient add complaint
exports.add = (req, res) => {

    const data = {
        patient_id: req.user.id,
        doctor_id: req.body.doctor_id,
        complaint_text: req.body.complaint_text
    };

    model.addComplaint(data, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Saved" });
    });
};

// patient see own
exports.my = (req, res) => {

    model.getMyComplaints(req.user.id, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

// doctor see reviews about him
exports.forDoctor = (req, res) => {

    model.getDoctorComplaints(req.user.id, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

// admin see all
exports.all = (req, res) => {

    model.getAllComplaints((err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};
