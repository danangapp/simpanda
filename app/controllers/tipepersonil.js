const TipePersonil = require("../models/tipepersonil.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tipepersonil = new TipePersonil({
        nama: req.body.nama,
    });

	var used = {};
	for (var i in tipe_personil) {
	    if (!tipe_personil[i]) {
	        delete tipe_personil[i];
	    }
	}

    TipePersonil.create(tipepersonil, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipePersonil."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipePersonil.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipepersonilnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipePersonil.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipepersonilnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipePersonil.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipePersonil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipePersonil with id " + req.params.id
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


    TipePersonil.updateById(
        req.params.id,
        new TipePersonil(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipePersonil with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipePersonil with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipePersonil.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipePersonil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipePersonil with id " + req.params.id
                });
            }
        } else res.send({ message: `TipePersonil was deleted successfully!` });
    });
};

