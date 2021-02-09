const Role = require("../models/role.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var role = {
        nama: req.body.nama,
    };

	var used = {};
	for (var i in role) {
	    if (!role[i]) {
	        delete role[i];
	    }
	}

    Role.create(role, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Role."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Role.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rolenames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Role.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rolenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Role.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Role with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Role with id " + req.params.id
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


    Role.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Role with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Role with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Role.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Role with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Role with id " + req.params.id
                });
            }
        } else res.send({ message: `Role was deleted successfully!` });
    });
};

