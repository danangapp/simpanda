const Sertifikat = require("../models/sertifikat.js");
const f = require('../controllers/function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const sertifikat = new Sertifikat({
        tipe_cert_id: req.body.tipe_cert_id,
        personil_id: req.body.personil_id,
        no_sertifikat: req.body.no_sertifikat,
        issuer: req.body.issuer,
        tempat_keluar_sertifikat: req.body.tempat_keluar_sertifikat,
        tanggal_keluar_sertifikat: f.toDate(req.body.tanggal_keluar_sertifikat),
        tanggal_expire: f.toDate(req.body.tanggal_expire),
        reminder_date: f.toDate(req.body.reminder_date),
        sertifikat: req.body.sertifikat,
        sertifikat: req.body.sertifikat,
        date: f.toDate(req.body.date),
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
        koneksi: req.body.koneksi,
    });

	var used = {};
	for (var i in sertifikat) {
	    if (!sertifikat[i]) {
	        delete sertifikat[i];
	    }
	}

    Sertifikat.create(sertifikat, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sertifikat."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Sertifikat.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sertifikatnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Sertifikat.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sertifikatnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Sertifikat.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sertifikat with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sertifikat with id " + req.params.id
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

	req.body.tanggal_keluar_sertifikat = f.toDate(req.body.tanggal_keluar_sertifikat);
	req.body.tanggal_expire = f.toDate(req.body.tanggal_expire);
	req.body.reminder_date = f.toDate(req.body.reminder_date);
	req.body.date = f.toDate(req.body.date);

    Sertifikat.updateById(
        req.params.id,
        new Sertifikat(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Sertifikat with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Sertifikat with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Sertifikat.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sertifikat with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sertifikat with id " + req.params.id
                });
            }
        } else res.send({ message: `Sertifikat was deleted successfully!` });
    });
};

