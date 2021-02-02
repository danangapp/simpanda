const Kondisi = require("../models/kondisi.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const kondisi = new Kondisi({
        nama: req.body.nama,
    });

    Kondisi.create(kondisi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Kondisi."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Kondisi.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kondisinames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Kondisi.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Kondisi with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Kondisi with id " + req.params.id
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

    Kondisi.updateById(
        req.params.id,
        new Kondisi(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Kondisi with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Kondisi with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Kondisi.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Kondisi with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Kondisi with id " + req.params.id
                });
            }
        } else res.send({ message: `Kondisi was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Kondisi.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all kondisinames."
            });
        else res.send({ message: `All Kondisis were deleted successfully!` });
    });
};
