const Cabang = require("../models/cabang.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const cabang = new Cabang({
        nama: req.body.nama,
    });

    Cabang.create(cabang, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cabang."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Cabang.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cabangnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Cabang.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cabangnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Cabang.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cabang with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Cabang with id " + req.params.id
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

    Cabang.updateById(
        req.params.id,
        new Cabang(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Cabang with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Cabang with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Cabang.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cabang with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Cabang with id " + req.params.id
                });
            }
        } else res.send({ message: `Cabang was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Cabang.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cabangnames."
            });
        else res.send({ message: `All Cabangs were deleted successfully!` });
    });
};
