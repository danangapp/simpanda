const AssetRumahDinas = require("../models/assetrumahdinas.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var assetrumahdinas = {
        nama_assets: req.body.nama_assets,
        satuan: req.body.satuan,
        tahun_perolehan: req.body.tahun_perolehan,
        nilai_perolehan: req.body.nilai_perolehan,
        wilayah: req.body.wilayah,
        nilai_buku: req.body.nilai_buku,
        approval_status_id: req.body.approval_status_id,
        tanggal: f.toDate(req.body.tanggal),
        nilai: req.body.nilai,
        catatan: req.body.catatan,
        enable: req.body.enable,
        date: f.toDate(req.body.date),
        item: req.body.item,
        action: req.body.action,
        user_id: req.body.user_id,
        remark: req.body.remark,
        koneksi: req.body.koneksi,
    };

	var used = {};
	for (var i in assetrumahdinas) {
	    if (!assetrumahdinas[i]) {
	        delete assetrumahdinas[i];
	    }
	}

    AssetRumahDinas.create(assetrumahdinas, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AssetRumahDinas."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    AssetRumahDinas.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetrumahdinasnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    AssetRumahDinas.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetrumahdinasnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    AssetRumahDinas.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetRumahDinas with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AssetRumahDinas with id " + req.params.id
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

	req.body.tanggal = f.toDate(req.body.tanggal);

    AssetRumahDinas.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AssetRumahDinas with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AssetRumahDinas with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    AssetRumahDinas.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetRumahDinas with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete AssetRumahDinas with id " + req.params.id
                });
            }
        } else res.send({ message: `AssetRumahDinas was deleted successfully!` });
    });
};

