const SaranaBantuPemandu = require("../models/saranabantupemandu.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const saranabantupemandu = new SaranaBantuPemandu({
        approval_status_id: req.body.approval_status_id,
        cabang_id: req.body.cabang_id,
        tanggal_pemeriksaan: f.toDate(req.body.tanggal_pemeriksaan),
        pelaksana: req.body.pelaksana,
    });

	var used = {};
	for (var i in saranabantupemandu) {
	    if (!saranabantupemandu[i]) {
	        delete saranabantupemandu[i];
	    }
	}

    SaranaBantuPemandu.create(saranabantupemandu, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SaranaBantuPemandu."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    SaranaBantuPemandu.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saranabantupemandunames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    SaranaBantuPemandu.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saranabantupemandunames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    SaranaBantuPemandu.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemandu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving SaranaBantuPemandu with id " + req.params.id
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

	req.body.tanggal_pemeriksaan = f.toDate(req.body.tanggal_pemeriksaan);

    SaranaBantuPemandu.updateById(
        req.params.id,
        new SaranaBantuPemandu(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SaranaBantuPemandu with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SaranaBantuPemandu with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    SaranaBantuPemandu.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemandu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SaranaBantuPemandu with id " + req.params.id
                });
            }
        } else res.send({ message: `SaranaBantuPemandu was deleted successfully!` });
    });
};

