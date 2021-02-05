const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

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

InvestigasiInsiden.create = async(newInvestigasiInsiden, result) => {
	try {
		var obj = new Object();
		obj.date = newInvestigasiInsiden.date;
		obj.item = newInvestigasiInsiden.item;
		obj.action = newInvestigasiInsiden.action;
		obj.user_id = newInvestigasiInsiden.user_id;
		obj.remark = newInvestigasiInsiden.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newInvestigasiInsiden.date;
		delete newInvestigasiInsiden.item;
		delete newInvestigasiInsiden.action;
		delete newInvestigasiInsiden.user_id;
		delete newInvestigasiInsiden.remark;

		const res = await query("INSERT INTO investigasi_insiden SET ?", newInvestigasiInsiden);
		result(null, { id: res.insertId, ...newInvestigasiInsiden });
	} catch (error) {
	    result(error, null);
	}
};

InvestigasiInsiden.findById = (id, result) => {
    sql.query(`SELECT * FROM investigasi_insiden WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found InvestigasiInsiden with the id
        result({ kind: "not_found" }, null);
    });
};

InvestigasiInsiden.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM investigasi_insiden";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += i + " ='" + param[i] + "' and ";
            }
        }

        query = query.substring(0, query.length - 5);
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

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

        result(null, res);
    });
};

InvestigasiInsiden.updateById = async(id, investigasiinsiden, result) => {
	try {
		var obj = new Object();
		obj.date = InvestigasiInsiden.date;
		obj.item = InvestigasiInsiden.item;
		obj.action = InvestigasiInsiden.action;
		obj.user_id = InvestigasiInsiden.user_id;
		obj.remark = InvestigasiInsiden.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete InvestigasiInsiden.date;
		delete InvestigasiInsiden.item;
		delete InvestigasiInsiden.action;
		delete InvestigasiInsiden.user_id;
		delete InvestigasiInsiden.remark;


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

		await query("UPDATE investigasi_insiden SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...investigasi_insiden });
	} catch (error) {
	    result(error, null);
	}
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

        result(null, res);
    });
};

module.exports = InvestigasiInsiden;

