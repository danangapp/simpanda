const DokumenKapal = require("../models/dokumenkapal.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const dokumenkapal = new DokumenKapal({
        nama: req.body.nama,
    });

	var used = {};
	for (var i in dokumen_kapal) {
	    if (!dokumen_kapal[i]) {
	        delete dokumen_kapal[i];
	    }
	}

    DokumenKapal.create(dokumenkapal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the DokumenKapal."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    DokumenKapal.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dokumenkapalnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    DokumenKapal.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dokumenkapalnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    DokumenKapal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found DokumenKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving DokumenKapal with id " + req.params.id
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


    DokumenKapal.updateById(
        req.params.id,
        new DokumenKapal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found DokumenKapal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating DokumenKapal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    DokumenKapal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found DokumenKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete DokumenKapal with id " + req.params.id
                });
            }
        } else res.send({ message: `DokumenKapal was deleted successfully!` });
    });
};

