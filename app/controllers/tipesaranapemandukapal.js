const TipeSaranaPemanduKapal = require("../models/tipesaranapemandukapal.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tipesaranapemandukapal = new TipeSaranaPemanduKapal({
        nama: req.body.nama,
    });

    TipeSaranaPemanduKapal.create(tipesaranapemandukapal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TipeSaranaPemanduKapal."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    TipeSaranaPemanduKapal.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipesaranapemandukapalnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    TipeSaranaPemanduKapal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeSaranaPemanduKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TipeSaranaPemanduKapal with id " + req.params.id
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

    TipeSaranaPemanduKapal.updateById(
        req.params.id,
        new TipeSaranaPemanduKapal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TipeSaranaPemanduKapal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TipeSaranaPemanduKapal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    TipeSaranaPemanduKapal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TipeSaranaPemanduKapal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TipeSaranaPemanduKapal with id " + req.params.id
                });
            }
        } else res.send({ message: `TipeSaranaPemanduKapal was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    TipeSaranaPemanduKapal.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tipesaranapemandukapalnames."
            });
        else res.send({ message: `All TipeSaranaPemanduKapals were deleted successfully!` });
    });
};
