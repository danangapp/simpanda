const PanduSchedule = require("../models/panduschedule.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const panduschedule = new PanduSchedule({
        date: req.body.date,
        cabang_id: req.body.cabang_id,
        pandu_jaga_id: req.body.pandu_jaga_id,
        pandu_jaga_nama: req.body.pandu_jaga_nama,
        status_absen: req.body.status_absen,
        keterangan: req.body.keterangan,
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

    PanduSchedule.create(panduschedule, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PanduSchedule."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    PanduSchedule.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving panduschedulenames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    PanduSchedule.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving panduschedulenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    PanduSchedule.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PanduSchedule with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PanduSchedule with id " + req.params.id
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


    PanduSchedule.updateById(
        req.params.id,
        new PanduSchedule(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found PanduSchedule with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating PanduSchedule with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PanduSchedule.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PanduSchedule with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete PanduSchedule with id " + req.params.id
                });
            }
        } else res.send({ message: `PanduSchedule was deleted successfully!` });
    });
};

