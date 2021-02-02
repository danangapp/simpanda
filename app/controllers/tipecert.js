const TipeCert = require("../models/tipecert.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tipecert = new TipeCert({
        nama: req.body.nama,
        remark: req.body.remark,
    });

    TipeCert.create(tipecert, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeCert."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeCert.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipecertnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipeCert.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipecertnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeCert.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeCert with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeCert with id " + req.params.id
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

    TipeCert.updateById(
        req.params.id,
        new TipeCert(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeCert with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeCert with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeCert.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeCert with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeCert with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeCert was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    TipeCert.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tipecertnames."
            });
        else res.send({ message: `All TipeCerts were deleted successfully!` });
    });
};
