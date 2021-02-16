const Cabang = require("../models/cabang.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var cabang = {
        nama: req.fields.nama,
        almt_cabang: req.fields.almt_cabang,
        cabang_cms: req.fields.cabang_cms,
        no_account_cabang: req.fields.no_account_cabang,
        nm_cabang_3digit: req.fields.nm_cabang_3digit,
        kd_account_cabang: req.fields.kd_account_cabang,
        kd_cabang_jai_puspel: req.fields.kd_cabang_jai_puspel,
        orgid: req.fields.orgid,
        port_code: req.fields.port_code,
        autospk: req.fields.autospk,
        kd_jenis_pelabuhan: req.fields.kd_jenis_pelabuhan,
    };

	var used = {};
	for (var i in cabang) {
	    if (!cabang[i]) {
	        delete cabang[i];
	    }
	}

    Cabang.create(cabang, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cabang."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Cabang.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cabangnames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    Cabang.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cabangnames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Cabang.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cabang with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Cabang with id " + req.params.id
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


    Cabang.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Cabang with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Cabang with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Cabang.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cabang with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Cabang with id " + req.params.id
                });
            }
        } else res.send({ message: `Cabang was deleted successfully!` });
    });
};

