const UserGroup = require("../models/usergroup.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const usergroup = new UserGroup({
        nama: req.body.nama,
        keterangan: req.body.keterangan,
        cabang_id: req.body.cabang_id,
        access_dashboard: req.body.access_dashboard,
        access_resource_pandu: req.body.access_resource_pandu,
        access_resource_pendukung: req.body.access_resource_pendukung,
        access_resource_absensi: req.body.access_resource_absensi,
        access_asset_kapal: req.body.access_asset_kapal,
        access_asset_stasiun: req.body.access_asset_stasiun,
        access_asset_rumah: req.body.access_asset_rumah,
        access_asset_absensi: req.body.access_asset_absensi,
        access_inspection_sarana: req.body.access_inspection_sarana,
        access_inspection_pemeriksaan: req.body.access_inspection_pemeriksaan,
        access_inspection_investigasi: req.body.access_inspection_investigasi,
    });

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
    UserGroup.getAll((err, data) => {
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
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    UserGroup.updateById(
        req.params.id,
        new UserGroup(req.body),
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

exports.deleteAll = (req, res) => {
    UserGroup.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all usergroupnames."
            });
        else res.send({ message: `All UserGroups were deleted successfully!` });
    });
};
