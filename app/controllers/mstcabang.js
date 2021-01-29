const MstCabang = require("../models/mstcabang.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const mstcabang = new MstCabang({
        nama: req.body.nama,
    });

    MstCabang.create(mstcabang, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MstCabang."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MstCabang.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mstcabangnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    MstCabang.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstCabang with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MstCabang with id " + req.params.id
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

    MstCabang.updateById(
        req.params.id,
        new MstCabang(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found MstCabang with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating MstCabang with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    MstCabang.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstCabang with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MstCabang with id " + req.params.id
                });
            }
        } else res.send({ message: `MstCabang was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MstCabang.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all mstcabangnames."
            });
        else res.send({ message: `All MstCabangs were deleted successfully!` });
    });
};
