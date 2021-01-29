const Sertifikat = require("../models/sertifikat.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const sertifikat = new Sertifikat({
        tipe: req.body.tipe,
        pemilik: req.body.pemilik,
        no_sertifikat: req.body.no_sertifikat,
        issuer: req.body.issuer,
        tempat_keluar_sertifikat: req.body.tempat_keluar_sertifikat,
        tanggal_keluar_sertifikat: req.body.tanggal_keluar_sertifikat,
        tanggal_expire: req.body.tanggal_expire,
        reminder_date: req.body.reminder_date,
        sertifikat: req.body.sertifikat,
    });

    Sertifikat.create(sertifikat, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sertifikat."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Sertifikat.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sertifikatnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Sertifikat.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sertifikat with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sertifikat with id " + req.params.id
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

    console.log(req.body);

    Sertifikat.updateById(
        req.params.id,
        new Sertifikat(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Sertifikat with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Sertifikat with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Sertifikat.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sertifikat with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sertifikat with id " + req.params.id
                });
            }
        } else res.send({ message: `Sertifikat was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Sertifikat.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all sertifikatnames."
            });
        else res.send({ message: `All Sertifikats were deleted successfully!` });
    });
};
