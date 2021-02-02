const ActivityLog = require("../models/activitylog.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const activitylog = new ActivityLog({
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

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
    ActivityLog.getAll((err, data) => {
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
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    ActivityLog.updateById(
        req.params.id,
        new ActivityLog(req.body),
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

exports.deleteAll = (req, res) => {
    ActivityLog.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all activitylognames."
            });
        else res.send({ message: `All ActivityLogs were deleted successfully!` });
    });
};
