const SaranaBantuPemandu = require("../models/saranabantupemandu.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var saranabantupemandu = {
        approval_status_id: req.fields.approval_status_id,
        cabang_id: req.fields.cabang_id,
        tanggal_pemeriksaan: f.toDate(req.fields.tanggal_pemeriksaan),
        pelaksana: req.fields.pelaksana,
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
        sarana_bantu_pemandu_personil: req.fields.sarana_bantu_pemandu_personil,
    };

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
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

	req.fields.tanggal_pemeriksaan = f.toDate(req.fields.tanggal_pemeriksaan);

    SaranaBantuPemandu.updateById(
        req.params.id,
        req.fields,
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

