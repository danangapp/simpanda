const TipeSaranaPemanduKapal = require("../models/tipesaranapemandukapal.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var tipesaranapemandukapal = {
        nama: req.fields.nama,
    };

	var used = {};
	for (var i in tipesaranapemandukapal) {
	    if (!tipesaranapemandukapal[i]) {
	        delete tipesaranapemandukapal[i];
	    }
	}

    TipeSaranaPemanduKapal.create(tipesaranapemandukapal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeSaranaPemanduKapal."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeSaranaPemanduKapal.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipesaranapemandukapalnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipeSaranaPemanduKapal.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipesaranapemandukapalnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeSaranaPemanduKapal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeSaranaPemanduKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeSaranaPemanduKapal with id " + req.params.id
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


    TipeSaranaPemanduKapal.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeSaranaPemanduKapal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeSaranaPemanduKapal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeSaranaPemanduKapal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeSaranaPemanduKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeSaranaPemanduKapal with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeSaranaPemanduKapal was deleted successfully!` });
    });
};

