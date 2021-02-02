const Action = require("../models/action.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const action = new Action({
        nama: req.body.nama,
    });

    Action.create(action, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Action."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Action.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving actionnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Action.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Action with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Action with id " + req.params.id
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

    Action.updateById(
        req.params.id,
        new Action(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Action with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Action with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Action.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Action with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Action with id " + req.params.id
                });
            }
        } else res.send({ message: `Action was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Action.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all actionnames."
            });
        else res.send({ message: `All Actions were deleted successfully!` });
    });
};
