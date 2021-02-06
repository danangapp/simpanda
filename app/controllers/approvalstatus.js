const ApprovalStatus = require("../models/approvalstatus.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const approvalstatus = new ApprovalStatus({
        nama: req.body.nama,
    });

	var used = {};
	for (var i in approval_status) {
	    if (!approval_status[i]) {
	        delete approval_status[i];
	    }
	}

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
    ApprovalStatus.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving approvalstatusnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    ApprovalStatus.design((err, data) => {
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

