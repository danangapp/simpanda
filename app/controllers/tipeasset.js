const TipeAsset = require("../models/tipeasset.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tipeasset = new TipeAsset({
        nama: req.body.nama,
    });

	var used = {};
	for (var i in tipeasset) {
	    if (!tipeasset[i]) {
	        delete tipeasset[i];
	    }
	}

    TipeAsset.create(tipeasset, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeAsset."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeAsset.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipeassetnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    TipeAsset.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipeassetnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeAsset.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeAsset with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeAsset with id " + req.params.id
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


    TipeAsset.updateById(
        req.params.id,
        new TipeAsset(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeAsset with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeAsset with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeAsset.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeAsset with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeAsset with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeAsset was deleted successfully!` });
    });
};

