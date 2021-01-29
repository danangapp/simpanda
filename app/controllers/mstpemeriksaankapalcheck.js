const MstPemeriksaanKapalCheck = require("../models/mstpemeriksaankapalcheck.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const mstpemeriksaankapalcheck = new MstPemeriksaanKapalCheck({
        no: req.body.no,
        question: req.body.question,
    });

    MstPemeriksaanKapalCheck.create(mstpemeriksaankapalcheck, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MstPemeriksaanKapalCheck."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MstPemeriksaanKapalCheck.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mstpemeriksaankapalchecknames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    MstPemeriksaanKapalCheck.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstPemeriksaanKapalCheck with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MstPemeriksaanKapalCheck with id " + req.params.id
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

    MstPemeriksaanKapalCheck.updateById(
        req.params.id,
        new MstPemeriksaanKapalCheck(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found MstPemeriksaanKapalCheck with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating MstPemeriksaanKapalCheck with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    MstPemeriksaanKapalCheck.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MstPemeriksaanKapalCheck with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MstPemeriksaanKapalCheck with id " + req.params.id
                });
            }
        } else res.send({ message: `MstPemeriksaanKapalCheck was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MstPemeriksaanKapalCheck.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all mstpemeriksaankapalchecknames."
            });
        else res.send({ message: `All MstPemeriksaanKapalChecks were deleted successfully!` });
    });
};
