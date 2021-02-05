const PemeriksaanKapalCheck = require("../models/pemeriksaankapalcheck.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const pemeriksaankapalcheck = new PemeriksaanKapalCheck({
        question: req.body.question,
    });

    PemeriksaanKapalCheck.create(pemeriksaankapalcheck, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PemeriksaanKapalCheck."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    PemeriksaanKapalCheck.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pemeriksaankapalchecknames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    PemeriksaanKapalCheck.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pemeriksaankapalchecknames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    PemeriksaanKapalCheck.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PemeriksaanKapalCheck with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PemeriksaanKapalCheck with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    PemeriksaanKapalCheck.updateById(
        req.params.id,
        new PemeriksaanKapalCheck(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found PemeriksaanKapalCheck with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating PemeriksaanKapalCheck with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PemeriksaanKapalCheck.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PemeriksaanKapalCheck with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete PemeriksaanKapalCheck with id " + req.params.id
                });
            }
        } else res.send({ message: `PemeriksaanKapalCheck was deleted successfully!` });
    });
};

