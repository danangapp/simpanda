const AssetStasiunEquipment2 = require("../models/assetstasiunequipment2.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const assetstasiunequipment2 = new AssetStasiunEquipment2({
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
	for (var i in asset_stasiun_equipment2) {
	    if (!asset_stasiun_equipment2[i]) {
	        delete asset_stasiun_equipment2[i];
	    }
	}

    AssetStasiunEquipment2.create(assetstasiunequipment2, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AssetStasiunEquipment2."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    AssetStasiunEquipment2.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetstasiunequipment2names."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    AssetStasiunEquipment2.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assetstasiunequipment2names."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    AssetStasiunEquipment2.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetStasiunEquipment2 with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AssetStasiunEquipment2 with id " + req.params.id
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


    AssetStasiunEquipment2.updateById(
        req.params.id,
        new AssetStasiunEquipment2(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AssetStasiunEquipment2 with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AssetStasiunEquipment2 with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    AssetStasiunEquipment2.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AssetStasiunEquipment2 with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete AssetStasiunEquipment2 with id " + req.params.id
                });
            }
        } else res.send({ message: `AssetStasiunEquipment2 was deleted successfully!` });
    });
};

