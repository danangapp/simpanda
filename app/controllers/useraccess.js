const UserAccess = require("../models/useraccess.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var useraccess = {
        user_group_id: req.fields.user_group_id,
        menu_id: req.fields.menu_id,
    };

	var used = {};
	for (var i in useraccess) {
	    if (!useraccess[i]) {
	        delete useraccess[i];
	    }
	}

    UserAccess.create(useraccess, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the UserAccess."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    UserAccess.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving useraccessnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    UserAccess.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving useraccessnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    UserAccess.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found UserAccess with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving UserAccess with id " + req.params.id
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


    UserAccess.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found UserAccess with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating UserAccess with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    UserAccess.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found UserAccess with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete UserAccess with id " + req.params.id
                });
            }
        } else res.send({ message: `UserAccess was deleted successfully!` });
    });
};

