const UserGroup = require("../models/usergroup.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var usergroup = {
        nama: req.fields.nama,
        keterangan: req.fields.keterangan,
        cabang_id: req.fields.cabang_id,
        access_dashboard: req.fields.access_dashboard,
        access_resource_pandu: req.fields.access_resource_pandu,
        access_resource_pendukung: req.fields.access_resource_pendukung,
        access_resource_absensi: req.fields.access_resource_absensi,
        access_asset_kapal: req.fields.access_asset_kapal,
        access_asset_stasiun: req.fields.access_asset_stasiun,
        access_asset_rumah: req.fields.access_asset_rumah,
        access_asset_absensi: req.fields.access_asset_absensi,
        access_inspection_sarana: req.fields.access_inspection_sarana,
        access_inspection_pemeriksaan: req.fields.access_inspection_pemeriksaan,
        access_inspection_investigasi: req.fields.access_inspection_investigasi,
    };

	var used = {};
	for (var i in usergroup) {
	    if (!usergroup[i]) {
	        delete usergroup[i];
	    }
	}

    UserGroup.create(usergroup, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the UserGroup."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    UserGroup.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving usergroupnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    UserGroup.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving usergroupnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    UserGroup.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found UserGroup with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving UserGroup with id " + req.params.id
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


    UserGroup.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found UserGroup with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating UserGroup with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    UserGroup.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found UserGroup with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete UserGroup with id " + req.params.id
                });
            }
        } else res.send({ message: `UserGroup was deleted successfully!` });
    });
};

