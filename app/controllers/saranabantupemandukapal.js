const SaranaBantuPemanduKapal = require("../models/saranabantupemandukapal.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const saranabantupemandukapal = new SaranaBantuPemanduKapal({
        SARANA_BANTU_PEMANDU_id: req.body.SARANA_BANTU_PEMANDU_id,
        tipe: req.body.tipe,
        dokumen_kapal_q1: req.body.dokumen_kapal_q1,
        dokumen_kapal_q2: req.body.dokumen_kapal_q2,
        dokumen_kapal_q3: req.body.dokumen_kapal_q3,
        dokumen_kapal_q4: req.body.dokumen_kapal_q4,
        dokumen_kapal_q5: req.body.dokumen_kapal_q5,
        dokumen_kapal_q6: req.body.dokumen_kapal_q6,
        dokumen_kapal_q7: req.body.dokumen_kapal_q7,
        dokumen_kapal_q8: req.body.dokumen_kapal_q8,
        dokumen_kapal_q9: req.body.dokumen_kapal_q9,
        dokumen_kapal_q10: req.body.dokumen_kapal_q10,
        dokumen_kapal_q11: req.body.dokumen_kapal_q11,
        dokumen_kapal_q12: req.body.dokumen_kapal_q12,
        dokumen_kapal_q13: req.body.dokumen_kapal_q13,
        dokumen_kapal_q14: req.body.dokumen_kapal_q14,
        dokumen_kapal_q15: req.body.dokumen_kapal_q15,
        kondisi_umum_q1: req.body.kondisi_umum_q1,
        kondisi_umum_q2: req.body.kondisi_umum_q2,
        kondisi_umum_q3: req.body.kondisi_umum_q3,
        kondisi_umum_q4: req.body.kondisi_umum_q4,
        kondisi_umum_q5: req.body.kondisi_umum_q5,
        kondisi_umum_q6: req.body.kondisi_umum_q6,
        pemeriksaan_performa_q1: req.body.pemeriksaan_performa_q1,
        pemeriksaan_performa_q2: req.body.pemeriksaan_performa_q2,
        pemeriksaan_performa_q3: req.body.pemeriksaan_performa_q3,
        pemeriksaan_performa_q4: req.body.pemeriksaan_performa_q4,
        pemeriksaan_performa_q5: req.body.pemeriksaan_performa_q5,
        pemeriksaan_fisik_a1: req.body.pemeriksaan_fisik_a1,
        pemeriksaan_fisik_a2: req.body.pemeriksaan_fisik_a2,
        pemeriksaan_fisik_a3: req.body.pemeriksaan_fisik_a3,
        pemeriksaan_fisik_a4: req.body.pemeriksaan_fisik_a4,
        pemeriksaan_fisik_a5: req.body.pemeriksaan_fisik_a5,
        pemeriksaan_fisik_a6: req.body.pemeriksaan_fisik_a6,
        pemeriksaan_fisik_a7: req.body.pemeriksaan_fisik_a7,
        pemeriksaan_fisik_b1: req.body.pemeriksaan_fisik_b1,
        pemeriksaan_fisik_b2: req.body.pemeriksaan_fisik_b2,
        pemeriksaan_fisik_b3: req.body.pemeriksaan_fisik_b3,
        pemeriksaan_fisik_b4: req.body.pemeriksaan_fisik_b4,
        pemeriksaan_fisik_b5: req.body.pemeriksaan_fisik_b5,
        pemeriksaan_fisik_b6: req.body.pemeriksaan_fisik_b6,
        pemeriksaan_fisik_b7: req.body.pemeriksaan_fisik_b7,
        pemeriksaan_fisik_b8: req.body.pemeriksaan_fisik_b8,
        pemeriksaan_fisik_b9: req.body.pemeriksaan_fisik_b9,
        pemeriksaan_fisik_c1: req.body.pemeriksaan_fisik_c1,
        pemeriksaan_fisik_c2: req.body.pemeriksaan_fisik_c2,
        pemeriksaan_fisik_c3: req.body.pemeriksaan_fisik_c3,
        pemeriksaan_fisik_c4: req.body.pemeriksaan_fisik_c4,
        pemeriksaan_fisik_c5: req.body.pemeriksaan_fisik_c5,
        pemeriksaan_fisik_c6: req.body.pemeriksaan_fisik_c6,
        pemeriksaan_fisik_c7: req.body.pemeriksaan_fisik_c7,
        pemeriksaan_fisik_d1: req.body.pemeriksaan_fisik_d1,
        pemeriksaan_fisik_d2: req.body.pemeriksaan_fisik_d2,
        pemeriksaan_fisik_d3: req.body.pemeriksaan_fisik_d3,
        pemeriksaan_fisik_d4: req.body.pemeriksaan_fisik_d4,
        pemeriksaan_fisik_d5: req.body.pemeriksaan_fisik_d5,
        pemeriksaan_fisik_d6: req.body.pemeriksaan_fisik_d6,
        pemeriksaan_fisik_d7: req.body.pemeriksaan_fisik_d7,
        pemeriksaan_fisik_d8: req.body.pemeriksaan_fisik_d8,
        pemeriksaan_fisik_d9: req.body.pemeriksaan_fisik_d9,
        pemeriksaan_fisik_e1: req.body.pemeriksaan_fisik_e1,
        pemeriksaan_fisik_e2: req.body.pemeriksaan_fisik_e2,
        pemeriksaan_fisik_e3: req.body.pemeriksaan_fisik_e3,
        pemeriksaan_fisik_f1: req.body.pemeriksaan_fisik_f1,
        pemeriksaan_fisik_f2: req.body.pemeriksaan_fisik_f2,
        pemeriksaan_fisik_f3: req.body.pemeriksaan_fisik_f3,
        pemeriksaan_fisik_f4: req.body.pemeriksaan_fisik_f4,
    });

    SaranaBantuPemanduKapal.create(saranabantupemandukapal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SaranaBantuPemanduKapal."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    SaranaBantuPemanduKapal.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saranabantupemandukapalnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    SaranaBantuPemanduKapal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemanduKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving SaranaBantuPemanduKapal with id " + req.params.id
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

    SaranaBantuPemanduKapal.updateById(
        req.params.id,
        new SaranaBantuPemanduKapal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SaranaBantuPemanduKapal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SaranaBantuPemanduKapal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    SaranaBantuPemanduKapal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SaranaBantuPemanduKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SaranaBantuPemanduKapal with id " + req.params.id
                });
            }
        } else res.send({ message: `SaranaBantuPemanduKapal was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    SaranaBantuPemanduKapal.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all saranabantupemandukapalnames."
            });
        else res.send({ message: `All SaranaBantuPemanduKapals were deleted successfully!` });
    });
};
