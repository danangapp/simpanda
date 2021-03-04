const Menu = require("../models/menu.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var menu = {
        nama: req.fields.nama,
        url: req.fields.url,
    };

	var used = {};
	for (var i in menu) {
	    if (!menu[i]) {
	        delete menu[i];
	    }
	}

    Menu.create(menu, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Menu."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Menu.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving menunames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Menu.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving menunames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Menu.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Menu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Menu with id " + req.params.id
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


    Menu.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Menu with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Menu with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Menu.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Menu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Menu with id " + req.params.id
                });
            }
        } else res.send({ message: `Menu was deleted successfully!` });
    });
};

