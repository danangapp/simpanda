const PanduJaga = require("../models/pandujaga.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var pandujaga = {
        pandu_schedule_id: req.fields.pandu_schedule_id,
        personil_id: req.fields.personil_id,
    };

	var used = {};
	for (var i in pandujaga) {
	    if (!pandujaga[i]) {
	        delete pandujaga[i];
	    }
	}

    PanduJaga.create(pandujaga, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PanduJaga."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    PanduJaga.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pandujaganames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    PanduJaga.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pandujaganames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    PanduJaga.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PanduJaga with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PanduJaga with id " + req.params.id
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


    PanduJaga.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found PanduJaga with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating PanduJaga with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PanduJaga.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PanduJaga with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete PanduJaga with id " + req.params.id
                });
            }
        } else res.send({ message: `PanduJaga was deleted successfully!` });
    });
};

