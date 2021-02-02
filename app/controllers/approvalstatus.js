const ApprovalStatus = require("../models/approvalstatus.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const approvalstatus = new ApprovalStatus({
        name: req.body.name,
    });

    ApprovalStatus.create(approvalstatus, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ApprovalStatus."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    ApprovalStatus.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving approvalstatusnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ApprovalStatus.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ApprovalStatus with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ApprovalStatus with id " + req.params.id
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

    ApprovalStatus.updateById(
        req.params.id,
        new ApprovalStatus(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ApprovalStatus with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ApprovalStatus with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    ApprovalStatus.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ApprovalStatus with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ApprovalStatus with id " + req.params.id
                });
            }
        } else res.send({ message: `ApprovalStatus was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    ApprovalStatus.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all approvalstatusnames."
            });
        else res.send({ message: `All ApprovalStatuss were deleted successfully!` });
    });
};
