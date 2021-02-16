const TipeStasiun = require("../models/tipestasiun.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var tipestasiun = {
        nama: req.fields.nama,
    };

	var used = {};
	for (var i in tipestasiun) {
	    if (!tipestasiun[i]) {
	        delete tipestasiun[i];
	    }
	}

    TipeStasiun.create(tipestasiun, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeStasiun."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeStasiun.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipestasiunnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipeStasiun.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipestasiunnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeStasiun.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeStasiun with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeStasiun with id " + req.params.id
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


    TipeStasiun.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeStasiun with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeStasiun with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeStasiun.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeStasiun with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeStasiun with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeStasiun was deleted successfully!` });
    });
};

