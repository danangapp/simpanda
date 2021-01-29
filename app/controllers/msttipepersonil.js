const MstTipePersonil = require("../models/msttipepersonil.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const msttipepersonil = new MstTipePersonil({
        nama: req.body.nama,
    });

    MstTipePersonil.create(msttipepersonil, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MstTipePersonil."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MstTipePersonil.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving msttipepersonilnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    MstTipePersonil.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstTipePersonil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MstTipePersonil with id " + req.params.id
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

    MstTipePersonil.updateById(
        req.params.id,
        new MstTipePersonil(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found MstTipePersonil with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating MstTipePersonil with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    MstTipePersonil.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstTipePersonil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MstTipePersonil with id " + req.params.id
                });
            }
        } else res.send({ message: `MstTipePersonil was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MstTipePersonil.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all msttipepersonilnames."
            });
        else res.send({ message: `All MstTipePersonils were deleted successfully!` });
    });
};
