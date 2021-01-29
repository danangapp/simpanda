const sql = require("../config/db.js");

// constructor
const InvestigasiInsiden = function (investigasiinsiden) {
    this.approval_status = investigasiinsiden.approval_status;
    this.no_report = investigasiinsiden.no_report;
    this.unit_terkait = investigasiinsiden.unit_terkait;
    this.judul_report = investigasiinsiden.judul_report;
    this.kronologi_kejadian = investigasiinsiden.kronologi_kejadian;
    this.temuan_investigasi = investigasiinsiden.temuan_investigasi;
    this.bukti_temuan = investigasiinsiden.bukti_temuan;
    this.saksi_1 = investigasiinsiden.saksi_1;
    this.saksi_2 = investigasiinsiden.saksi_2;
    this.investigator = investigasiinsiden.investigator;
    this.rincian_kegiatan = investigasiinsiden.rincian_kegiatan;
    this.luka_sakit = investigasiinsiden.luka_sakit;
    this.wujud_cedera = investigasiinsiden.wujud_cedera;
    this.bagian_tubuh_cedera = investigasiinsiden.bagian_tubuh_cedera;
    this.mekanisme_cedera = investigasiinsiden.mekanisme_cedera;
    this.kerusakan_alat = investigasiinsiden.kerusakan_alat;
    this.uraian_kejadian = investigasiinsiden.uraian_kejadian;
    this.analisa_penyebab = investigasiinsiden.analisa_penyebab;
    this.peralatan_kelengkapan = investigasiinsiden.peralatan_kelengkapan;
    this.alat_pelindung_diri = investigasiinsiden.alat_pelindung_diri;
    this.perilaku = investigasiinsiden.perilaku;
    this.kebersihan_kerapihan = investigasiinsiden.kebersihan_kerapihan;
    this.peralatan_perlengkapan = investigasiinsiden.peralatan_perlengkapan;
    this.kemampuan_kondisi_fisik = investigasiinsiden.kemampuan_kondisi_fisik;
    this.pemeliharaan_perbaikan = investigasiinsiden.pemeliharaan_perbaikan;
    this.design = investigasiinsiden.design;
    this.tingkat_kemampuan = investigasiinsiden.tingkat_kemampuan;
    this.penjagaan = investigasiinsiden.penjagaan;
    this.tidandakan_terkait = investigasiinsiden.tidandakan_terkait;
    this.faktor_utama_insiden = investigasiinsiden.faktor_utama_insiden;
    this.rekomendasi_tindakan = investigasiinsiden.rekomendasi_tindakan;
    this.pihak_yang_bertanggungjawab = investigasiinsiden.pihak_yang_bertanggungjawab;
    this.pelaksana = investigasiinsiden.pelaksana;
    this.tanggal_pemeriksaan = investigasiinsiden.tanggal_pemeriksaan;
    this.nama = investigasiinsiden.nama;
    this.jabatan = investigasiinsiden.jabatan;
    this.status = investigasiinsiden.status;
    this.prepard_by = investigasiinsiden.prepard_by;
    this.prepard_tanggal = investigasiinsiden.prepard_tanggal;
    this.reviewed_by = investigasiinsiden.reviewed_by;
    this.reviewed_tanggal = investigasiinsiden.reviewed_tanggal;
    this.approved_by = investigasiinsiden.approved_by;
    this.approved_tanggal = investigasiinsiden.approved_tanggal;
};

InvestigasiInsiden.create = (newInvestigasiInsiden, result) => {
    sql.query("INSERT INTO investigasi_insiden SET ?", newInvestigasiInsiden, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created investigasiinsiden: ", { id: res.insertId, ...newInvestigasiInsiden });
        result(null, { id: res.insertId, ...newInvestigasiInsiden });
    });
};

InvestigasiInsiden.findById = (id, result) => {
    sql.query(`SELECT * FROM investigasi_insiden WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found investigasiinsiden: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found InvestigasiInsiden with the id
        result({ kind: "not_found" }, null);
    });
};

InvestigasiInsiden.getAll = result => {
    sql.query("SELECT * FROM investigasi_insiden", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("investigasiinsiden: ", res);
        result(null, res);
    });
};

InvestigasiInsiden.updateById = (id, investigasiinsiden, result) => {
    sql.query(
        "UPDATE investigasi_insiden SET  approval_status = ?, no_report = ?, unit_terkait = ?, judul_report = ?, kronologi_kejadian = ?, temuan_investigasi = ?, bukti_temuan = ?, saksi_1 = ?, saksi_2 = ?, investigator = ?, rincian_kegiatan = ?, luka_sakit = ?, wujud_cedera = ?, bagian_tubuh_cedera = ?, mekanisme_cedera = ?, kerusakan_alat = ?, uraian_kejadian = ?, analisa_penyebab = ?, peralatan_kelengkapan = ?, alat_pelindung_diri = ?, perilaku = ?, kebersihan_kerapihan = ?, peralatan_perlengkapan = ?, kemampuan_kondisi_fisik = ?, pemeliharaan_perbaikan = ?, design = ?, tingkat_kemampuan = ?, penjagaan = ?, tidandakan_terkait = ?, faktor_utama_insiden = ?, rekomendasi_tindakan = ?, pihak_yang_bertanggungjawab = ?, pelaksana = ?, tanggal_pemeriksaan = ?, nama = ?, jabatan = ?, status = ?, prepard_by = ?, prepard_tanggal = ?, reviewed_by = ?, reviewed_tanggal = ?, approved_by = ?, approved_tanggal = ? WHERE id = ?",
        [investigasiinsiden.approval_status, investigasiinsiden.no_report, investigasiinsiden.unit_terkait, investigasiinsiden.judul_report, investigasiinsiden.kronologi_kejadian, investigasiinsiden.temuan_investigasi, investigasiinsiden.bukti_temuan, investigasiinsiden.saksi_1, investigasiinsiden.saksi_2, investigasiinsiden.investigator, investigasiinsiden.rincian_kegiatan, investigasiinsiden.luka_sakit, investigasiinsiden.wujud_cedera, investigasiinsiden.bagian_tubuh_cedera, investigasiinsiden.mekanisme_cedera, investigasiinsiden.kerusakan_alat, investigasiinsiden.uraian_kejadian, investigasiinsiden.analisa_penyebab, investigasiinsiden.peralatan_kelengkapan, investigasiinsiden.alat_pelindung_diri, investigasiinsiden.perilaku, investigasiinsiden.kebersihan_kerapihan, investigasiinsiden.peralatan_perlengkapan, investigasiinsiden.kemampuan_kondisi_fisik, investigasiinsiden.pemeliharaan_perbaikan, investigasiinsiden.design, investigasiinsiden.tingkat_kemampuan, investigasiinsiden.penjagaan, investigasiinsiden.tidandakan_terkait, investigasiinsiden.faktor_utama_insiden, investigasiinsiden.rekomendasi_tindakan, investigasiinsiden.pihak_yang_bertanggungjawab, investigasiinsiden.pelaksana, investigasiinsiden.tanggal_pemeriksaan, investigasiinsiden.nama, investigasiinsiden.jabatan, investigasiinsiden.status, investigasiinsiden.prepard_by, investigasiinsiden.prepard_tanggal, investigasiinsiden.reviewed_by, investigasiinsiden.reviewed_tanggal, investigasiinsiden.approved_by, investigasiinsiden.approved_tanggal, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found InvestigasiInsiden with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated investigasiinsiden: ", { id: id, ...investigasiinsiden });
            result(null, { id: id, ...investigasiinsiden });
        }
    );
};

InvestigasiInsiden.remove = (id, result) => {
    sql.query("DELETE FROM investigasi_insiden WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found InvestigasiInsiden with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted investigasiinsiden with id: ", id);
        result(null, res);
    });
};

InvestigasiInsiden.removeAll = result => {
    sql.query("DELETE FROM investigasi_insiden", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} investigasiinsiden`);
        result(null, res);
    });
};

module.exports = InvestigasiInsiden;

