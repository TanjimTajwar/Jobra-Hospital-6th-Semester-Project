const model = require('../models/reportModel');

// doctor add
exports.add = (req, res) => {

    const data = {
        doctor_id: req.user.id,
        patient_id: req.body.patient_id,
        diagnosis: req.body.diagnosis,
        prescription: req.body.prescription,
        medical_test: req.body.medical_test,
        advice: req.body.advice
    };

    model.addReport(data, (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Report Saved" });
    });
};

// patient view
exports.patientView = (req, res) => {

    model.getPatientReports(req.user.id, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

// doctor view his
exports.doctorView = (req, res) => {

    model.getDoctorReports(req.user.id, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};
