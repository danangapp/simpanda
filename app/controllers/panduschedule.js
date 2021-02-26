const PanduSchedule = require("../models/panduschedule.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // console.log(req);
    const fields = req.fields;
    var panduschedule = []
    for (var a in fields) {
        var b = fields[a];
        var arr = {
            date: f.toDate(b.date),
            cabang_id: b.cabang_id,
            status_absen_id: b.status_absen_id,
            keterangan: b.keterangan,
            approval_status_id: b.approval_status_id,
            enable: b.enable,
            pandu_jaga_id: b.pandu_jaga_id,
            pandu_bandar_laut_id: b.pandu_bandar_laut_id,
            date: f.toDate(b.date),
            item: b.item,
            action: b.action,
            user_id: b.user_id,
            remark: b.remark,
            koneksi: b.koneksi,
            pandu_jaga: b.pandu_jaga,
        };

        panduschedule.push(arr);
    }

    // var used = {};
    // for (var i in panduschedule) {
    //     if (!panduschedule[i]) {
    //         delete panduschedule[i];
    //     }
    // }

    console.log(panduschedule);

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
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    req.fields.date = f.toDate(req.fields.date);

    PanduSchedule.updateById(
        req.params.id,
        req.fields,
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

