const AssetKapal = require("../models/assetkapal.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const assetkapal = new AssetKapal({
        simop_kd_fas: req.body.simop_kd_fas,
        kepemilikan_kapal: req.body.kepemilikan_kapal,
        simop_status_milik: req.body.simop_status_milik,
        simop_kd_agen: req.body.simop_kd_agen,
        tipe_asset_id: req.body.tipe_asset_id,
        nama_asset: req.body.nama_asset,
        horse_power: req.body.horse_power,
        tahun_perolehan: req.body.tahun_perolehan,
        nilai_perolehan: req.body.nilai_perolehan,
        lokasi: req.body.lokasi,
        enable: req.body.enable,
        asset_number: req.body.asset_number,
        simop_kd_puspel_jai: req.body.simop_kd_puspel_jai,
        simop_new_puspel_jai: req.body.simop_new_puspel_jai,
        simop_new_asset_jai: req.body.simop_new_asset_jai,
        approval_status_id: req.body.approval_status_id,
        loa: req.body.loa,
        tahun_pembuatan: req.body.tahun_pembuatan,
        breadth: req.body.breadth,
        kontruksi: req.body.kontruksi,
        depth: req.body.depth,
        negara_pembuat: req.body.negara_pembuat,
        draft_max: req.body.draft_max,
        daya: req.body.daya,
        putaran: req.body.putaran,
        merk: req.body.merk,
        tipe: req.body.tipe,
        daya_motor: req.body.daya_motor,
        daya_generator: req.body.daya_generator,
        putaran_spesifikasi: req.body.putaran_spesifikasi,
        merk_spesifikasi: req.body.merk_spesifikasi,
        tipe_spesifikasi: req.body.tipe_spesifikasi,
        klas: req.body.klas,
        notasi_permesinan: req.body.notasi_permesinan,
        no_registrasi: req.body.no_registrasi,
        notasi_perlengkapan: req.body.notasi_perlengkapan,
        port_of_registration: req.body.port_of_registration,
        notasi_perairan: req.body.notasi_perairan,
        notasi_lambung: req.body.notasi_lambung,
        gross_tonnage: req.body.gross_tonnage,
        bolard_pull: req.body.bolard_pull,
        kecepatan: req.body.kecepatan,
        ship_particular: req.body.ship_particular,
        sertifikat: req.body.sertifikat,
        date: req.body.date,
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
    });

    AssetKapal.create(assetkapal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AssetKapal."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    AssetKapal.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetkapalnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    AssetKapal.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetkapalnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    AssetKapal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AssetKapal with id " + req.params.id
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


    AssetKapal.updateById(
        req.params.id,
        new AssetKapal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AssetKapal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AssetKapal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    AssetKapal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete AssetKapal with id " + req.params.id
                });
            }
        } else res.send({ message: `AssetKapal was deleted successfully!` });
    });
};

