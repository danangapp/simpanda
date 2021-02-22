const Sertifikat = require("../models/sertifikat.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var sertifikat = {
        jenis_cert_id: req.fields.jenis_cert_id,
        tipe_cert_id: req.fields.tipe_cert_id,
        personil_id: req.fields.personil_id,
        asset_kapal_id: req.fields.asset_kapal_id,
        no_sertifikat: req.fields.no_sertifikat,
        issuer: req.fields.issuer,
        tempat_keluar_sertifikat: f.toDate(req.fields.tempat_keluar_sertifikat),
        tanggal_keluar_sertifikat: f.toDate(req.fields.tanggal_keluar_sertifikat),
        tanggal_expire: f.toDate(req.fields.tanggal_expire),
        reminder_date1: f.toDate(req.fields.reminder_date1),
        reminder_date3: f.toDate(req.fields.reminder_date3),
        reminder_date6: f.toDate(req.fields.reminder_date6),
        sertifikat: req.fields.sertifikat,
        sertifikat_id: req.fields.sertifikat_id,
        sertifikat: req.fields.sertifikat,
    };

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
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

	req.fields.tempat_keluar_sertifikat = f.toDate(req.fields.tempat_keluar_sertifikat);
	req.fields.tanggal_keluar_sertifikat = f.toDate(req.fields.tanggal_keluar_sertifikat);
	req.fields.tanggal_expire = f.toDate(req.fields.tanggal_expire);
	req.fields.reminder_date1 = f.toDate(req.fields.reminder_date1);
	req.fields.reminder_date3 = f.toDate(req.fields.reminder_date3);
	req.fields.reminder_date6 = f.toDate(req.fields.reminder_date6);
	req.fields.date = f.toDate(req.fields.date);

    Sertifikat.updateById(
        req.params.id,
        req.fields,
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

