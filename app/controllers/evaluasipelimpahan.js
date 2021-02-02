const EvaluasiPelimpahan = require("../models/evaluasipelimpahan.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const evaluasipelimpahan = new EvaluasiPelimpahan({
        approval_status_id: req.body.approval_status_id,
        cabang_id: req.body.cabang_id,
        bup: req.body.bup,
        izin_bup: req.body.izin_bup,
        penetapan_perairan_pandu: req.body.penetapan_perairan_pandu,
        izin_pelimpahan: req.body.izin_pelimpahan,
        pengawas_pemanduan: req.body.pengawas_pemanduan,
        laporan_bulanan: req.body.laporan_bulanan,
        bukti_pembayaran_pnpb: req.body.bukti_pembayaran_pnpb,
        sispro: req.body.sispro,
        tarif_jasa_pandu_tunda: req.body.tarif_jasa_pandu_tunda,
        data_dukung: req.body.data_dukung,
        dile_pendukung: req.body.dile_pendukung,
        tanggal_sk: req.body.tanggal_sk,
        file_sk_pelimpahan: req.body.file_sk_pelimpahan,
    });

    EvaluasiPelimpahan.create(evaluasipelimpahan, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the EvaluasiPelimpahan."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    EvaluasiPelimpahan.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving evaluasipelimpahannames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    EvaluasiPelimpahan.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found EvaluasiPelimpahan with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving EvaluasiPelimpahan with id " + req.params.id
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

    EvaluasiPelimpahan.updateById(
        req.params.id,
        new EvaluasiPelimpahan(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found EvaluasiPelimpahan with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating EvaluasiPelimpahan with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    EvaluasiPelimpahan.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found EvaluasiPelimpahan with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete EvaluasiPelimpahan with id " + req.params.id
                });
            }
        } else res.send({ message: `EvaluasiPelimpahan was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    EvaluasiPelimpahan.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all evaluasipelimpahannames."
            });
        else res.send({ message: `All EvaluasiPelimpahans were deleted successfully!` });
    });
};
