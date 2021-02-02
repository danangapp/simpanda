const  = require("../models/.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const  = new ({
        nama: req.body.nama,
        almt_cabang: req.body.almt_cabang,
        cabang_cms: req.body.cabang_cms,
        no_account_cabang: req.body.no_account_cabang,
        nm_cabang_3digit: req.body.nm_cabang_3digit,
        kd_account_cabang: req.body.kd_account_cabang,
        kd_cabang_jai_puspel: req.body.kd_cabang_jai_puspel,
        org_id: req.body.org_id,
        port_code: req.body.port_code,
        autospk: req.body.autospk,
        kd_jenis_pelabuhan: req.body.kd_jenis_pelabuhan,
    });

    .create(, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    .getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving names."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    .design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving names."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    .findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found  with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving  with id " + req.params.id
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

    .updateById(
        req.params.id,
        new (req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found  with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating  with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    .remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found  with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete  with id " + req.params.id
                });
            }
        } else res.send({ message: ` was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    .removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all names."
            });
        else res.send({ message: `All s were deleted successfully!` });
    });
};
