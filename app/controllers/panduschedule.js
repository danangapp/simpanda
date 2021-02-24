const PanduSchedule = require("../models/panduschedule.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var panduschedule = {
        date: f.toDate(req.fields.date),
        cabang_id: req.fields.cabang_id,
        status_absen_id: req.fields.status_absen_id,
        keterangan: req.fields.keterangan,
        approval_status_id: req.fields.approval_status_id,
        enable: req.fields.enable,
        pandu_jaga_id: req.fields.pandu_jaga_id,
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
    };

	var used = {};
	for (var i in panduschedule) {
	    if (!panduschedule[i]) {
	        delete panduschedule[i];
	    }
	}

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

