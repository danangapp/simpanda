const ArmadaSchedule = require("../models/armadaschedule.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const armadaschedule = new ArmadaSchedule({
        date: req.body.date,
        cabang: req.body.cabang,
        kategori_armada: req.body.kategori_armada,
        armada_id: req.body.armada_id,
        status: req.body.status,
        jam_pengoperasian: req.body.jam_pengoperasian,
        reliabiliy: req.body.reliabiliy,
        keterangan: req.body.keterangan,
    });

	var used = {};
	for (var i in armada_schedule) {
	    if (!armada_schedule[i]) {
	        delete armada_schedule[i];
	    }
	}

    ArmadaSchedule.create(armadaschedule, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ArmadaSchedule."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    ArmadaSchedule.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving armadaschedulenames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    ArmadaSchedule.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving armadaschedulenames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ArmadaSchedule.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ArmadaSchedule with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ArmadaSchedule with id " + req.params.id
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


    ArmadaSchedule.updateById(
        req.params.id,
        new ArmadaSchedule(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ArmadaSchedule with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ArmadaSchedule with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    ArmadaSchedule.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ArmadaSchedule with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ArmadaSchedule with id " + req.params.id
                });
            }
        } else res.send({ message: `ArmadaSchedule was deleted successfully!` });
    });
};

