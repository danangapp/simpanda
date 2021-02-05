const StatusIjazah = require("../models/statusijazah.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const statusijazah = new StatusIjazah({
        nama: req.body.nama,
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

    StatusIjazah.create(statusijazah, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the StatusIjazah."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    StatusIjazah.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statusijazahnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    StatusIjazah.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statusijazahnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    StatusIjazah.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusIjazah with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving StatusIjazah with id " + req.params.id
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


    StatusIjazah.updateById(
        req.params.id,
        new StatusIjazah(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found StatusIjazah with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating StatusIjazah with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    StatusIjazah.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusIjazah with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete StatusIjazah with id " + req.params.id
                });
            }
        } else res.send({ message: `StatusIjazah was deleted successfully!` });
    });
};

