const MstTipeAsset = require("../models/msttipeasset.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const msttipeasset = new MstTipeAsset({
        nama: req.body.nama,
    });

    MstTipeAsset.create(msttipeasset, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MstTipeAsset."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MstTipeAsset.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving msttipeassetnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    MstTipeAsset.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstTipeAsset with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MstTipeAsset with id " + req.params.id
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

    MstTipeAsset.updateById(
        req.params.id,
        new MstTipeAsset(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found MstTipeAsset with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating MstTipeAsset with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    MstTipeAsset.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstTipeAsset with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MstTipeAsset with id " + req.params.id
                });
            }
        } else res.send({ message: `MstTipeAsset was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MstTipeAsset.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all msttipeassetnames."
            });
        else res.send({ message: `All MstTipeAssets were deleted successfully!` });
    });
};
