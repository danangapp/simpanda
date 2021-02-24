const ArmadaJaga = require("../models/armadajaga.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var armadajaga = {
        tipe_asset_id: req.fields.tipe_asset_id,
        asset_kapal_id: req.fields.asset_kapal_id,
        armada_schedule_id: req.fields.armada_schedule_id,
    };

	var used = {};
	for (var i in armadajaga) {
	    if (!armadajaga[i]) {
	        delete armadajaga[i];
	    }
	}

    ArmadaJaga.create(armadajaga, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ArmadaJaga."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    ArmadaJaga.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving armadajaganames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    ArmadaJaga.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving armadajaganames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ArmadaJaga.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ArmadaJaga with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ArmadaJaga with id " + req.params.id
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


    ArmadaJaga.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ArmadaJaga with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ArmadaJaga with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    ArmadaJaga.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ArmadaJaga with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ArmadaJaga with id " + req.params.id
                });
            }
        } else res.send({ message: `ArmadaJaga was deleted successfully!` });
    });
};

