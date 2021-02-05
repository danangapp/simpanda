const Personil = require("../models/personil.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const personil = new Personil({
        tipe_personil_id: req.body.tipe_personil_id,
        approval_status_id: req.body.approval_status_id,
        simop_kd_pers_pandu: req.body.simop_kd_pers_pandu,
        simop_kd_pers_pandu_cbg: req.body.simop_kd_pers_pandu_cbg,
        enable: req.body.enable,
        asset_kapal_id: req.body.asset_kapal_id,
        nama: req.body.nama,
        kelas: req.body.kelas,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        nipp: req.body.nipp,
        jabatan: req.body.jabatan,
        status_kepegawaian_id: req.body.status_kepegawaian_id,
        cv: req.body.cv,
        tempat_tugas: req.body.tempat_tugas,
        nomor_sk: req.body.nomor_sk,
        tanggal_mulai: req.body.tanggal_mulai,
        tanggal_selesai: req.body.tanggal_selesai,
        sk: req.body.sk,
        skpp: req.body.skpp,
        surat_kesehatan: req.body.surat_kesehatan,
        sertifikat: req.body.sertifikat,
    });

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
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    Personil.updateById(
        req.params.id,
        new Personil(req.body),
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

