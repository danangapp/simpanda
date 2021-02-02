const TipeStasiun = require("../models/tipestasiun.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tipestasiun = new TipeStasiun({
        nama: req.body.nama,
    });

    TipeStasiun.create(tipestasiun, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeStasiun."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeStasiun.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipestasiunnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipeStasiun.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipestasiunnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeStasiun.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeStasiun with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeStasiun with id " + req.params.id
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

    TipeStasiun.updateById(
        req.params.id,
        new TipeStasiun(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeStasiun with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeStasiun with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeStasiun.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeStasiun with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeStasiun with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeStasiun was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    TipeStasiun.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tipestasiunnames."
            });
        else res.send({ message: `All TipeStasiuns were deleted successfully!` });
    });
};
