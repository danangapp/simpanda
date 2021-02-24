const AssetKapal = require("../models/assetkapal.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var assetkapal = {
        simop_kd_fas: req.fields.simop_kd_fas,
        kepemilikan_kapal: req.fields.kepemilikan_kapal,
        simop_status_milik: req.fields.simop_status_milik,
        simop_kd_agen: req.fields.simop_kd_agen,
        tipe_asset_id: req.fields.tipe_asset_id,
        nama_asset: req.fields.nama_asset,
        horse_power: req.fields.horse_power,
        tahun_perolehan: req.fields.tahun_perolehan,
        nilai_perolehan: req.fields.nilai_perolehan,
        lokasi: req.fields.lokasi,
        enable: req.fields.enable,
        asset_number: req.fields.asset_number,
        simop_kd_puspel_jai: req.fields.simop_kd_puspel_jai,
        simop_new_puspel_jai: req.fields.simop_new_puspel_jai,
        simop_new_asset_jai: req.fields.simop_new_asset_jai,
        approval_status_id: req.fields.approval_status_id,
        loa: req.fields.loa,
        tahun_pembuatan: req.fields.tahun_pembuatan,
        breadth: req.fields.breadth,
        kontruksi: req.fields.kontruksi,
        depth: req.fields.depth,
        negara_pembuat: req.fields.negara_pembuat,
        draft_max: req.fields.draft_max,
        daya: req.fields.daya,
        putaran: req.fields.putaran,
        merk: req.fields.merk,
        tipe: req.fields.tipe,
        daya_motor: req.fields.daya_motor,
        daya_generator: req.fields.daya_generator,
        putaran_spesifikasi: req.fields.putaran_spesifikasi,
        merk_spesifikasi: req.fields.merk_spesifikasi,
        tipe_spesifikasi: req.fields.tipe_spesifikasi,
        klas: req.fields.klas,
        notasi_permesinan: req.fields.notasi_permesinan,
        no_registrasi: req.fields.no_registrasi,
        notasi_perlengkapan: req.fields.notasi_perlengkapan,
        port_of_registration: req.fields.port_of_registration,
        notasi_perairan: req.fields.notasi_perairan,
        notasi_lambung: req.fields.notasi_lambung,
        gross_tonnage: req.fields.gross_tonnage,
        bolard_pull: req.fields.bolard_pull,
        kecepatan: req.fields.kecepatan,
        ship_particular: req.fields.ship_particular,
        sertifikat_id: req.fields.sertifikat_id,
        sertifikat: req.fields.sertifikat,
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
    };

	var used = {};
	for (var i in assetkapal) {
	    if (!assetkapal[i]) {
	        delete assetkapal[i];
	    }
	}

	if (req.fields.ship_particular) {
	    assetkapal.ship_particular = f.uploadFile64('asset_kapal', req.fields.ship_particular);
	}

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
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

	req.fields.date = f.toDate(req.fields.date);
	if (req.fields.ship_particular) {
	    req.fields.ship_particular = f.uploadFile64('asset_kapal', req.fields.ship_particular);
	}


    AssetKapal.updateById(
        req.params.id,
        req.fields,
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

