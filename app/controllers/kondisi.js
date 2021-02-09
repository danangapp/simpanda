const Kondisi = require("../models/kondisi.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var kondisi = {
        nama: req.body.nama,
    };

	var used = {};
	for (var i in kondisi) {
	    if (!kondisi[i]) {
	        delete kondisi[i];
	    }
	}

    Kondisi.create(kondisi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Kondisi."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Kondisi.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kondisinames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Kondisi.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kondisinames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Kondisi.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Kondisi with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Kondisi with id " + req.params.id
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


    Kondisi.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Kondisi with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Kondisi with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Kondisi.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Kondisi with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Kondisi with id " + req.params.id
                });
            }
        } else res.send({ message: `Kondisi was deleted successfully!` });
    });
};

