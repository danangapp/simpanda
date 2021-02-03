const sql = require("../config/db.js");

// constructor
const InvestigasiInsiden = function (investigasiinsiden) {
    this.approval_status_id = investigasiinsiden.approval_status_id;
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
    this.status_investigasi_insiden_id = investigasiinsiden.status_investigasi_insiden_id;
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

InvestigasiInsiden.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'investigasi_insiden'", (err, res) => {
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
	var str = "", obj = [], no = 1;
	for (var i in investigasiinsiden) {
	    if (investigasiinsiden[i]) {
	        str += i + " = ?, ";
	        obj.push(investigasiinsiden[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE investigasi_insiden SET " + str + " WHERE id = ?",
        obj,
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

