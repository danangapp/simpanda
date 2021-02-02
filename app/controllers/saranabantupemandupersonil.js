const SaranaBantuPemanduPersonil = require("../models/saranabantupemandupersonil.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const saranabantupemandupersonil = new SaranaBantuPemanduPersonil({
        sarana_bantu_pemandu_id: req.body.sarana_bantu_pemandu_id,
        nama: req.body.nama,
        jabatan: req.body.jabatan,
        asset_kapal_id: req.body.asset_kapal_id,
        status_ijazah_id: req.body.status_ijazah_id,
    });

    SaranaBantuPemanduPersonil.create(saranabantupemandupersonil, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SaranaBantuPemanduPersonil."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    SaranaBantuPemanduPersonil.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saranabantupemandupersonilnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    SaranaBantuPemanduPersonil.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saranabantupemandupersonilnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    SaranaBantuPemanduPersonil.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemanduPersonil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving SaranaBantuPemanduPersonil with id " + req.params.id
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

    SaranaBantuPemanduPersonil.updateById(
        req.params.id,
        new SaranaBantuPemanduPersonil(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SaranaBantuPemanduPersonil with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SaranaBantuPemanduPersonil with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    SaranaBantuPemanduPersonil.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemanduPersonil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SaranaBantuPemanduPersonil with id " + req.params.id
                });
            }
        } else res.send({ message: `SaranaBantuPemanduPersonil was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    SaranaBantuPemanduPersonil.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all saranabantupemandupersonilnames."
            });
        else res.send({ message: `All SaranaBantuPemanduPersonils were deleted successfully!` });
    });
};
