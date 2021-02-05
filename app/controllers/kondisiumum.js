const KondisiUmum = require("../models/kondisiumum.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const kondisiumum = new KondisiUmum({
        nama: req.body.nama,
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

    KondisiUmum.create(kondisiumum, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the KondisiUmum."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    KondisiUmum.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kondisiumumnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    KondisiUmum.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kondisiumumnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    KondisiUmum.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found KondisiUmum with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving KondisiUmum with id " + req.params.id
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


    KondisiUmum.updateById(
        req.params.id,
        new KondisiUmum(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found KondisiUmum with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating KondisiUmum with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    KondisiUmum.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found KondisiUmum with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete KondisiUmum with id " + req.params.id
                });
            }
        } else res.send({ message: `KondisiUmum was deleted successfully!` });
    });
};

