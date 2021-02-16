const ActivityLog = require("../models/activitylog.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var activitylog = {
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
    };

	var used = {};
	for (var i in activitylog) {
	    if (!activitylog[i]) {
	        delete activitylog[i];
	    }
	}

    ActivityLog.create(activitylog, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ActivityLog."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    ActivityLog.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving activitylognames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    ActivityLog.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving activitylognames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ActivityLog.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ActivityLog with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ActivityLog with id " + req.params.id
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

    ActivityLog.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ActivityLog with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ActivityLog with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    ActivityLog.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ActivityLog with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ActivityLog with id " + req.params.id
                });
            }
        } else res.send({ message: `ActivityLog was deleted successfully!` });
    });
};

