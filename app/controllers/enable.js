const Enable = require("../models/enable.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var enable = {
        nama: req.fields.nama,
    };

	var used = {};
	for (var i in enable) {
	    if (!enable[i]) {
	        delete enable[i];
	    }
	}

    Enable.create(enable, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Enable."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Enable.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving enablenames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Enable.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving enablenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Enable.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Enable with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Enable with id " + req.params.id
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


    Enable.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Enable with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Enable with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Enable.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Enable with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Enable with id " + req.params.id
                });
            }
        } else res.send({ message: `Enable was deleted successfully!` });
    });
};

