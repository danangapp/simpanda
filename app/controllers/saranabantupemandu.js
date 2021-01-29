const SaranaBantuPemandu = require("../models/saranabantupemandu.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const saranabantupemandu = new SaranaBantuPemandu({
        approval_status: req.body.approval_status,
        lokasi: req.body.lokasi,
        tanggal_pemeriksaan: req.body.tanggal_pemeriksaan,
        pelaksana: req.body.pelaksana,
    });

    SaranaBantuPemandu.create(saranabantupemandu, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SaranaBantuPemandu."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    SaranaBantuPemandu.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saranabantupemandunames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    SaranaBantuPemandu.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemandu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving SaranaBantuPemandu with id " + req.params.id
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

    SaranaBantuPemandu.updateById(
        req.params.id,
        new SaranaBantuPemandu(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SaranaBantuPemandu with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SaranaBantuPemandu with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    SaranaBantuPemandu.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemandu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SaranaBantuPemandu with id " + req.params.id
                });
            }
        } else res.send({ message: `SaranaBantuPemandu was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    SaranaBantuPemandu.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all saranabantupemandunames."
            });
        else res.send({ message: `All SaranaBantuPemandus were deleted successfully!` });
    });
};
