const TipeCert = require("../models/tipecert.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var tipecert = {
        nama: req.fields.nama,
        remark: req.fields.remark,
        jenis: req.fields.jenis,
    };

	var used = {};
	for (var i in tipecert) {
	    if (!tipecert[i]) {
	        delete tipecert[i];
	    }
	}

    TipeCert.create(tipecert, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeCert."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeCert.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipecertnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipeCert.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipecertnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeCert.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeCert with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeCert with id " + req.params.id
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


    TipeCert.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeCert with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeCert with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeCert.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeCert with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeCert with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeCert was deleted successfully!` });
    });
};

