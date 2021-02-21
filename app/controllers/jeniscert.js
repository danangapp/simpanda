const JenisCert = require("../models/jeniscert.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var jeniscert = {
        nama: req.fields.nama,
        remark: req.fields.remark,
    };

	var used = {};
	for (var i in jeniscert) {
	    if (!jeniscert[i]) {
	        delete jeniscert[i];
	    }
	}

    JenisCert.create(jeniscert, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the JenisCert."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    JenisCert.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jeniscertnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    JenisCert.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jeniscertnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    JenisCert.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found JenisCert with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving JenisCert with id " + req.params.id
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


    JenisCert.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found JenisCert with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating JenisCert with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    JenisCert.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found JenisCert with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete JenisCert with id " + req.params.id
                });
            }
        } else res.send({ message: `JenisCert was deleted successfully!` });
    });
};

