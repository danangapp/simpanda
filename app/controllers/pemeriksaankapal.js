const PemeriksaanKapal = require("../models/pemeriksaankapal.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const pemeriksaankapal = new PemeriksaanKapal({
        approval_status_id: req.body.approval_status_id,
        enable: req.body.enable,
        asset_kapal_id: req.body.asset_kapal_id,
        cabang: req.body.cabang,
        kondisi_id: req.body.kondisi_id,
        tanggal_awal: f.toDate(req.body.tanggal_awal),
        tanggal_akhir: f.toDate(req.body.tanggal_akhir),
        keterangan: req.body.keterangan,
    });

	var used = {};
	for (var i in pemeriksaankapal) {
	    if (!pemeriksaankapal[i]) {
	        delete pemeriksaankapal[i];
	    }
	}

    PemeriksaanKapal.create(pemeriksaankapal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PemeriksaanKapal."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    PemeriksaanKapal.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pemeriksaankapalnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    PemeriksaanKapal.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pemeriksaankapalnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    PemeriksaanKapal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PemeriksaanKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PemeriksaanKapal with id " + req.params.id
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

	req.body.tanggal_awal = f.toDate(req.body.tanggal_awal);
	req.body.tanggal_akhir = f.toDate(req.body.tanggal_akhir);

    PemeriksaanKapal.updateById(
        req.params.id,
        new PemeriksaanKapal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found PemeriksaanKapal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating PemeriksaanKapal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PemeriksaanKapal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PemeriksaanKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete PemeriksaanKapal with id " + req.params.id
                });
            }
        } else res.send({ message: `PemeriksaanKapal was deleted successfully!` });
    });
};

