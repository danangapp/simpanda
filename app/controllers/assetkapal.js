const AssetKapal = require("../models/assetkapal.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const assetkapal = new AssetKapal({
        simop_KD_FAS: req.body.simop_KD_FAS,
        kepemilikan_kapal: req.body.kepemilikan_kapal,
        simop_STATUS_MILIK: req.body.simop_STATUS_MILIK,
        simop_KD_AGEN: req.body.simop_KD_AGEN,
        jenis_kapal: req.body.jenis_kapal,
        nama_asset: req.body.nama_asset,
        horse_power: req.body.horse_power,
        tahun_perolehan: req.body.tahun_perolehan,
        nilai_perolehan: req.body.nilai_perolehan,
        lokasi: req.body.lokasi,
        enable: req.body.enable,
        asset_number: req.body.asset_number,
        simop_KD_PUSPEL_JAI: req.body.simop_KD_PUSPEL_JAI,
        simop_NEW_PUSPEL_JAI: req.body.simop_NEW_PUSPEL_JAI,
        simop_NEW_ASSET_JSI: req.body.simop_NEW_ASSET_JSI,
        approval_status: req.body.approval_status,
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
        nolard_pull: req.body.nolard_pull,
        kecepatan: req.body.kecepatan,
        ship_particular: req.body.ship_particular,
        sertifikat_id: req.body.sertifikat_id,
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
    AssetKapal.getAll((err, data) => {
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

    console.log(req.body);

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

exports.deleteAll = (req, res) => {
    AssetKapal.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all assetkapalnames."
            });
        else res.send({ message: `All AssetKapals were deleted successfully!` });
    });
};
