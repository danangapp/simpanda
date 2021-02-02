const StatusInvestigasiInsiden = require("../models/statusinvestigasiinsiden.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const statusinvestigasiinsiden = new StatusInvestigasiInsiden({
        nama: req.body.nama,
    });

    StatusInvestigasiInsiden.create(statusinvestigasiinsiden, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the StatusInvestigasiInsiden."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    StatusInvestigasiInsiden.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statusinvestigasiinsidennames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    StatusInvestigasiInsiden.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statusinvestigasiinsidennames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    StatusInvestigasiInsiden.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusInvestigasiInsiden with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving StatusInvestigasiInsiden with id " + req.params.id
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

    StatusInvestigasiInsiden.updateById(
        req.params.id,
        new StatusInvestigasiInsiden(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found StatusInvestigasiInsiden with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating StatusInvestigasiInsiden with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    StatusInvestigasiInsiden.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusInvestigasiInsiden with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete StatusInvestigasiInsiden with id " + req.params.id
                });
            }
        } else res.send({ message: `StatusInvestigasiInsiden was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    StatusInvestigasiInsiden.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all statusinvestigasiinsidennames."
            });
        else res.send({ message: `All StatusInvestigasiInsidens were deleted successfully!` });
    });
};
