const ArmadaSchedule = require("../models/armadaschedule.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const fields = req.fields;
    var armadaschedule = []
    for (var a in fields) {
        var b = fields[a];
        var arr = {
            date: f.toDate(b.date),
            cabang: b.cabang,
            tipe_asset_id: b.tipe_asset_id,
            asset_kapal_id: b.asset_kapal_id,
            status: b.status,
            jam_pengoperasian: b.jam_pengoperasian,
            reliability: b.reliability,
            keterangan: b.keterangan,
            armada_jaga_id: b.armada_jaga_id,
            armada_jaga: b.armada_jaga,
        };

        armadaschedule.push(arr);
    }

    var used = {};
    for (var i in armadaschedule) {
        var b = armadaschedule[i];
        for (var a in b) {
            if (!b[a]) {
                delete b[a];
            }
        }
    }




    ArmadaSchedule.create(armadaschedule, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ArmadaSchedule."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    ArmadaSchedule.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving armadaschedulenames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    ArmadaSchedule.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving armadaschedulenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ArmadaSchedule.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ArmadaSchedule with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ArmadaSchedule with id " + req.params.id
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

    // req.fields.date = f.toDate(req.fields.date);

    ArmadaSchedule.updateById(
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ArmadaSchedule.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ArmadaSchedule"
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    ArmadaSchedule.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ArmadaSchedule with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ArmadaSchedule with id " + req.params.id
                });
            }
        } else res.send({ message: `ArmadaSchedule was deleted successfully!` });
    });
};

