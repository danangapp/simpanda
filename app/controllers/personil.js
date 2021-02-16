const Personil = require("../models/personil.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var personil = {
        tipe_personil_id: req.fields.tipe_personil_id,
        approval_status_id: req.fields.approval_status_id,
        simop_kd_pers_pandu: req.fields.simop_kd_pers_pandu,
        simop_kd_pers_pandu_cbg: req.fields.simop_kd_pers_pandu_cbg,
        enable: req.fields.enable,
        asset_kapal_id: req.fields.asset_kapal_id,
        nama: req.fields.nama,
        kelas: req.fields.kelas,
        tempat_lahir: req.fields.tempat_lahir,
        tanggal_lahir: f.toDate(req.fields.tanggal_lahir),
        nipp: req.fields.nipp,
        jabatan: req.fields.jabatan,
        status_kepegawaian_id: req.fields.status_kepegawaian_id,
        cv: req.fields.cv,
        tempat_tugas: req.fields.tempat_tugas,
        nomor_sk: req.fields.nomor_sk,
        tanggal_mulai: f.toDate(req.fields.tanggal_mulai),
        tanggal_selesai: f.toDate(req.fields.tanggal_selesai),
        sk: req.fields.sk,
        skpp: req.fields.skpp,
        surat_kesehatan: req.fields.surat_kesehatan,
        sertifikat: req.fields.sertifikat,
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
    };

	var used = {};
	for (var i in personil) {
	    if (!personil[i]) {
	        delete personil[i];
	    }
	}

    Personil.create(personil, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Personil."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Personil.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving personilnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Personil.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving personilnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Personil.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Personil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Personil with id " + req.params.id
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

	req.fields.tanggal_lahir = f.toDate(req.fields.tanggal_lahir);
	req.fields.tanggal_mulai = f.toDate(req.fields.tanggal_mulai);
	req.fields.tanggal_selesai = f.toDate(req.fields.tanggal_selesai);
	req.fields.date = f.toDate(req.fields.date);

    Personil.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Personil with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Personil with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Personil.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Personil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Personil with id " + req.params.id
                });
            }
        } else res.send({ message: `Personil was deleted successfully!` });
    });
};

