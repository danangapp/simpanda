const Enable = require("../models/enable.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const enable = new Enable({
        nama: req.body.nama,
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

    Enable.create(enable, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Enable."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Enable.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving enablenames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Enable.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving enablenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Enable.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Enable with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Enable with id " + req.params.id
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


    Enable.updateById(
        req.params.id,
        new Enable(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Enable with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Enable with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Enable.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Enable with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Enable with id " + req.params.id
                });
            }
        } else res.send({ message: `Enable was deleted successfully!` });
    });
};

