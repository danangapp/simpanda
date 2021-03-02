const InvestigasiInsidenTim = require("../models/investigasiinsidentim.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var investigasiinsidentim = {
        nama: req.fields.nama,
        jabatan: req.fields.jabatan,
        tgl: req.fields.tgl,
        status: req.fields.status,
        investigasi_insiden_id: req.fields.investigasi_insiden_id,
    };

	var used = {};
	for (var i in investigasiinsidentim) {
	    if (!investigasiinsidentim[i]) {
	        delete investigasiinsidentim[i];
	    }
	}

    InvestigasiInsidenTim.create(investigasiinsidentim, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the InvestigasiInsidenTim."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    InvestigasiInsidenTim.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving investigasiinsidentimnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    InvestigasiInsidenTim.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving investigasiinsidentimnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    InvestigasiInsidenTim.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found InvestigasiInsidenTim with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving InvestigasiInsidenTim with id " + req.params.id
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


    InvestigasiInsidenTim.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found InvestigasiInsidenTim with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating InvestigasiInsidenTim with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    InvestigasiInsidenTim.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found InvestigasiInsidenTim with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete InvestigasiInsidenTim with id " + req.params.id
                });
            }
        } else res.send({ message: `InvestigasiInsidenTim was deleted successfully!` });
    });
};

