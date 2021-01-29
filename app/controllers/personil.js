const Personil = require("../models/personil.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const personil = new Personil({
        tipe_personil: req.body.tipe_personil,
        approval_status: req.body.approval_status,
        simop_KD_PERS_PANDU: req.body.simop_KD_PERS_PANDU,
        simop_KD_PERS_PANDU_CBG: req.body.simop_KD_PERS_PANDU_CBG,
        enable: req.body.enable,
        kapal: req.body.kapal,
        nama: req.body.nama,
        kelas: req.body.kelas,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        nipp: req.body.nipp,
        jabatan: req.body.jabatan,
        status_kepegawaian: req.body.status_kepegawaian,
        cv: req.body.cv,
        tempat_tugas: req.body.tempat_tugas,
        nomor_sk: req.body.nomor_sk,
        tanggal_mulai: req.body.tanggal_mulai,
        tanggal_selesai: req.body.tanggal_selesai,
        sk: req.body.sk,
        skpp: req.body.skpp,
        surat_kesehatan: req.body.surat_kesehatan,
        sertifikat_id: req.body.sertifikat_id,
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
    Personil.getAll((err, data) => {
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

    console.log(req.body);

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

exports.deleteAll = (req, res) => {
    Personil.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all personilnames."
            });
        else res.send({ message: `All Personils were deleted successfully!` });
    });
};
