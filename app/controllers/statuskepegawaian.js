const StatusKepegawaian = require("../models/statuskepegawaian.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const statuskepegawaian = new StatusKepegawaian({
        nama: req.body.nama,
    });

    StatusKepegawaian.create(statuskepegawaian, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the StatusKepegawaian."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    StatusKepegawaian.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statuskepegawaiannames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    StatusKepegawaian.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusKepegawaian with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving StatusKepegawaian with id " + req.params.id
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

    StatusKepegawaian.updateById(
        req.params.id,
        new StatusKepegawaian(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found StatusKepegawaian with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating StatusKepegawaian with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    StatusKepegawaian.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StatusKepegawaian with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete StatusKepegawaian with id " + req.params.id
                });
            }
        } else res.send({ message: `StatusKepegawaian was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    StatusKepegawaian.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all statuskepegawaiannames."
            });
        else res.send({ message: `All StatusKepegawaians were deleted successfully!` });
    });
};
