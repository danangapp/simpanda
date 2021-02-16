const InvestigasiInsiden = require("../models/investigasiinsiden.js");
const f = require('./function');

exports.create = (req, res) => {
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var investigasiinsiden = {
        approval_status_id: req.fields.approval_status_id,
        enable: req.fields.enable,
        no_report: req.fields.no_report,
        unit_terkait: req.fields.unit_terkait,
        judul_report: req.fields.judul_report,
        kronologi_kejadian: req.fields.kronologi_kejadian,
        temuan_investigasi: req.fields.temuan_investigasi,
        bukti_temuan: req.fields.bukti_temuan,
        saksi_1: req.fields.saksi_1,
        saksi_2: req.fields.saksi_2,
        investigator: req.fields.investigator,
        rincian_kegiatan: req.fields.rincian_kegiatan,
        luka_sakit: req.fields.luka_sakit,
        wujud_cedera: req.fields.wujud_cedera,
        bagian_tubuh_cedera: req.fields.bagian_tubuh_cedera,
        mekanisme_cedera: req.fields.mekanisme_cedera,
        kerusakan_alat: req.fields.kerusakan_alat,
        uraian_kejadian: req.fields.uraian_kejadian,
        analisa_penyebab: req.fields.analisa_penyebab,
        peralatan_kelengkapan: req.fields.peralatan_kelengkapan,
        alat_pelindung_diri: req.fields.alat_pelindung_diri,
        perilaku: req.fields.perilaku,
        kebersihan_kerapihan: req.fields.kebersihan_kerapihan,
        peralatan_perlengkapan: req.fields.peralatan_perlengkapan,
        kemampuan_kondisi_fisik: req.fields.kemampuan_kondisi_fisik,
        pemeliharaan_perbaikan: req.fields.pemeliharaan_perbaikan,
        design: req.fields.design,
        tingkat_kemampuan: req.fields.tingkat_kemampuan,
        penjagaan: req.fields.penjagaan,
        tidandakan_terkait: req.fields.tidandakan_terkait,
        faktor_utama_insiden: req.fields.faktor_utama_insiden,
        rekomendasi_tindakan: req.fields.rekomendasi_tindakan,
        pihak_yang_bertanggungjawab: req.fields.pihak_yang_bertanggungjawab,
        pelaksana: req.fields.pelaksana,
        tanggal_pemeriksaan: req.fields.tanggal_pemeriksaan,
        nama: req.fields.nama,
        jabatan: req.fields.jabatan,
        status_investigasi_insiden_id: req.fields.status_investigasi_insiden_id,
        prepard_by: req.fields.prepard_by,
        prepard_tanggal: f.toDate(req.fields.prepard_tanggal),
        reviewed_by: req.fields.reviewed_by,
        reviewed_tanggal: f.toDate(req.fields.reviewed_tanggal),
        approved_by: req.fields.approved_by,
        approved_tanggal: f.toDate(req.fields.approved_tanggal),
        date: f.toDate(req.fields.date),
        item: req.fields.item,
        action: req.fields.action,
        user_id: req.fields.user_id,
        remark: req.fields.remark,
        koneksi: req.fields.koneksi,
    };

	var used = {};
	for (var i in investigasiinsiden) {
	    if (!investigasiinsiden[i]) {
	        delete investigasiinsiden[i];
	    }
	}

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
    if (!req.fields) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

	req.fields.prepard_tanggal = f.toDate(req.fields.prepard_tanggal);
	req.fields.reviewed_tanggal = f.toDate(req.fields.reviewed_tanggal);
	req.fields.approved_tanggal = f.toDate(req.fields.approved_tanggal);

    InvestigasiInsiden.updateById(
        req.params.id,
        req.fields,
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

