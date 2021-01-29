const MstRole = require("../models/mstrole.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const mstrole = new MstRole({
        nama: req.body.nama,
    });

    MstRole.create(mstrole, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MstRole."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MstRole.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mstrolenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    MstRole.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstRole with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MstRole with id " + req.params.id
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

    MstRole.updateById(
        req.params.id,
        new MstRole(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found MstRole with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating MstRole with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    MstRole.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstRole with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MstRole with id " + req.params.id
                });
            }
        } else res.send({ message: `MstRole was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MstRole.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all mstrolenames."
            });
        else res.send({ message: `All MstRoles were deleted successfully!` });
    });
};
