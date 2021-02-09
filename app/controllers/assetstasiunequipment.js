const AssetStasiunEquipment = require("../models/assetstasiunequipment.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const assetstasiunequipment = new AssetStasiunEquipment({
        nomor_asset: req.body.nomor_asset,
        tipe_stasiun_id: req.body.tipe_stasiun_id,
        nama: req.body.nama,
        tahun_perolehan: req.body.tahun_perolehan,
        nilai_perolehan: req.body.nilai_perolehan,
        kondisi: req.body.kondisi,
        approval_status_id: req.body.approval_status_id,
        enable: req.body.enable,
    });

	var used = {};
	for (var i in assetstasiunequipment) {
	    if (!assetstasiunequipment[i]) {
	        delete assetstasiunequipment[i];
	    }
	}

    AssetStasiunEquipment.create(assetstasiunequipment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AssetStasiunEquipment."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    AssetStasiunEquipment.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetstasiunequipmentnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    AssetStasiunEquipment.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetstasiunequipmentnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    AssetStasiunEquipment.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetStasiunEquipment with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AssetStasiunEquipment with id " + req.params.id
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


    AssetStasiunEquipment.updateById(
        req.params.id,
        new AssetStasiunEquipment(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AssetStasiunEquipment with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AssetStasiunEquipment with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    AssetStasiunEquipment.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetStasiunEquipment with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete AssetStasiunEquipment with id " + req.params.id
                });
            }
        } else res.send({ message: `AssetStasiunEquipment was deleted successfully!` });
    });
};

