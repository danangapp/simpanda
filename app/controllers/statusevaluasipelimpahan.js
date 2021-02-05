const StatusEvaluasiPelimpahan = require("../models/statusevaluasipelimpahan.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const statusevaluasipelimpahan = new StatusEvaluasiPelimpahan({
        nama: req.body.nama,
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

    StatusEvaluasiPelimpahan.create(statusevaluasipelimpahan, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the StatusEvaluasiPelimpahan."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    StatusEvaluasiPelimpahan.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statusevaluasipelimpahannames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    StatusEvaluasiPelimpahan.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statusevaluasipelimpahannames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    StatusEvaluasiPelimpahan.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusEvaluasiPelimpahan with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving StatusEvaluasiPelimpahan with id " + req.params.id
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


    StatusEvaluasiPelimpahan.updateById(
        req.params.id,
        new StatusEvaluasiPelimpahan(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found StatusEvaluasiPelimpahan with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating StatusEvaluasiPelimpahan with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    StatusEvaluasiPelimpahan.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusEvaluasiPelimpahan with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete StatusEvaluasiPelimpahan with id " + req.params.id
                });
            }
        } else res.send({ message: `StatusEvaluasiPelimpahan was deleted successfully!` });
    });
};

