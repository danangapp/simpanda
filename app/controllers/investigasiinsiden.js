const InvestigasiInsiden = require("../models/investigasiinsiden.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const investigasiinsiden = new InvestigasiInsiden({
        approval_status_id: req.body.approval_status_id,
        no_report: req.body.no_report,
        unit_terkait: req.body.unit_terkait,
        judul_report: req.body.judul_report,
        kronologi_kejadian: req.body.kronologi_kejadian,
        temuan_investigasi: req.body.temuan_investigasi,
        bukti_temuan: req.body.bukti_temuan,
        saksi_1: req.body.saksi_1,
        saksi_2: req.body.saksi_2,
        investigator: req.body.investigator,
        rincian_kegiatan: req.body.rincian_kegiatan,
        luka_sakit: req.body.luka_sakit,
        wujud_cedera: req.body.wujud_cedera,
        bagian_tubuh_cedera: req.body.bagian_tubuh_cedera,
        mekanisme_cedera: req.body.mekanisme_cedera,
        kerusakan_alat: req.body.kerusakan_alat,
        uraian_kejadian: req.body.uraian_kejadian,
        analisa_penyebab: req.body.analisa_penyebab,
        peralatan_kelengkapan: req.body.peralatan_kelengkapan,
        alat_pelindung_diri: req.body.alat_pelindung_diri,
        perilaku: req.body.perilaku,
        kebersihan_kerapihan: req.body.kebersihan_kerapihan,
        peralatan_perlengkapan: req.body.peralatan_perlengkapan,
        kemampuan_kondisi_fisik: req.body.kemampuan_kondisi_fisik,
        pemeliharaan_perbaikan: req.body.pemeliharaan_perbaikan,
        design: req.body.design,
        tingkat_kemampuan: req.body.tingkat_kemampuan,
        penjagaan: req.body.penjagaan,
        tidandakan_terkait: req.body.tidandakan_terkait,
        faktor_utama_insiden: req.body.faktor_utama_insiden,
        rekomendasi_tindakan: req.body.rekomendasi_tindakan,
        pihak_yang_bertanggungjawab: req.body.pihak_yang_bertanggungjawab,
        pelaksana: req.body.pelaksana,
        tanggal_pemeriksaan: req.body.tanggal_pemeriksaan,
        nama: req.body.nama,
        jabatan: req.body.jabatan,
        status_investigasi_insiden_id: req.body.status_investigasi_insiden_id,
        prepard_by: req.body.prepard_by,
        prepard_tanggal: req.body.prepard_tanggal,
        reviewed_by: req.body.reviewed_by,
        reviewed_tanggal: req.body.reviewed_tanggal,
        approved_by: req.body.approved_by,
        approved_tanggal: req.body.approved_tanggal,
    });

    InvestigasiInsiden.create(investigasiinsiden, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the InvestigasiInsiden."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    InvestigasiInsiden.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving investigasiinsidennames."
            });
        else res.send(data);
    });
};

exports.design = (req, res) => {
    InvestigasiInsiden.design((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving investigasiinsidennames."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    InvestigasiInsiden.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found InvestigasiInsiden with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving InvestigasiInsiden with id " + req.params.id
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


    InvestigasiInsiden.updateById(
        req.params.id,
        new InvestigasiInsiden(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found InvestigasiInsiden with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating InvestigasiInsiden with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    InvestigasiInsiden.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found InvestigasiInsiden with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete InvestigasiInsiden with id " + req.params.id
                });
            }
        } else res.send({ message: `InvestigasiInsiden was deleted successfully!` });
    });
};

