const AssetRumahDinas = require("../models/assetrumahdinas.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var assetrumahdinas = {
        nama_asset: req.fields.nama_asset,
        satuan: req.fields.satuan,
        tahun_perolehan: req.fields.tahun_perolehan,
        nilai_perolehan: req.fields.nilai_perolehan,
        wilayah: req.fields.wilayah,
        nilai_buku: req.fields.nilai_buku,
        approval_status_id: req.fields.approval_status_id,
        tanggal: f.toDate(req.fields.tanggal),
        nilai: req.fields.nilai,
        catatan: req.fields.catatan,
        enable: req.fields.enable,
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
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
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

	req.fields.tanggal = f.toDate(req.fields.tanggal);

    AssetRumahDinas.updateById(
        req.params.id,
        req.fields,
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

