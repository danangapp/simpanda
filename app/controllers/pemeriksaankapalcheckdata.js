const PemeriksaanKapalCheckData = require("../models/pemeriksaankapalcheckdata.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var pemeriksaankapalcheckdata = {
        kondisi_id: req.fields.kondisi_id,
        tanggal_awal: f.toDate(req.fields.tanggal_awal),
        tanggal_akhir: f.toDate(req.fields.tanggal_akhir),
        keterangan: req.fields.keterangan,
        pemeriksaan_kapal_id: req.fields.pemeriksaan_kapal_id,
        pemeriksaan_kapal_check_id: req.fields.pemeriksaan_kapal_check_id,
    };

	var used = {};
	for (var i in pemeriksaankapalcheckdata) {
	    if (!pemeriksaankapalcheckdata[i]) {
	        delete pemeriksaankapalcheckdata[i];
	    }
	}

    PemeriksaanKapalCheckData.create(pemeriksaankapalcheckdata, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PemeriksaanKapalCheckData."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    PemeriksaanKapalCheckData.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pemeriksaankapalcheckdatanames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    PemeriksaanKapalCheckData.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pemeriksaankapalcheckdatanames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    PemeriksaanKapalCheckData.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PemeriksaanKapalCheckData with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PemeriksaanKapalCheckData with id " + req.params.id
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

	req.fields.tanggal_awal = f.toDate(req.fields.tanggal_awal);
	req.fields.tanggal_akhir = f.toDate(req.fields.tanggal_akhir);

    PemeriksaanKapalCheckData.updateById(
        req.params.id,
        req.fields,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found PemeriksaanKapalCheckData with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating PemeriksaanKapalCheckData with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PemeriksaanKapalCheckData.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PemeriksaanKapalCheckData with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete PemeriksaanKapalCheckData with id " + req.params.id
                });
            }
        } else res.send({ message: `PemeriksaanKapalCheckData was deleted successfully!` });
    });
};

