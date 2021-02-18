const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const InvestigasiInsiden = function (investigasiinsiden) {
    this.approval_status_id = investigasiinsiden.approval_status_id;
    this.enable = investigasiinsiden.enable;
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

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'investigasiinsiden';
		objek.action = objects.approval_status_id;
		objek.user_id = objects.user_id;
		objek.remark = objects.remark;
		objek.koneksi = koneksi;
		delete objects.date;
		delete objects.item;
		delete objects.action;
		delete objects.user_id;
		delete objects.remark;
		delete objects.koneksi;
		return objects
};

InvestigasiInsiden.create = async(newInvestigasiInsiden, result) => {
	try {
		newInvestigasiInsiden = setActivity(newInvestigasiInsiden);
		const res = await query("INSERT INTO investigasi_insiden SET ?", newInvestigasiInsiden);
		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newInvestigasiInsiden });
	} catch (error) {
	    result(error, null);
	}
};

InvestigasiInsiden.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama as status_investigasi_insiden FROM investigasi_insiden a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN status_investigasi_insiden a3 ON a.status_investigasi_insiden_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
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
    var wheres = "";
    var query = "SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama as status_investigasi_insiden FROM investigasi_insiden a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN status_investigasi_insiden a3 ON a.status_investigasi_insiden_id = a3.id ";
    if (length > 0) {
        wheres += " WHERE ";
        for (var i in param) {
        	if (i != "q") {
        	    var str = param[i];
        	    if (typeof str != "string") {
        	        wheres += "(";
        	        for (var x in str) {
        	            wheres += "a." + i + " ='" + str[x] + "' or ";
        	        }
        	        wheres = wheres.substring(0, wheres.length - 4);
        	        wheres += ") and ";
        	    } else {
        	        wheres += "a." + i + " ='" + param[i] + "' and ";
        	    }
        	}
        }

        if (wheres.length > 7){
        	wheres = wheres.substring(0, wheres.length - 5);
        }
    }

	if (param.q) {
		wheres += wheres.length == 7 ? "(" : "OR (";
		wheres += "a.approval_status_id LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%' OR a.no_report LIKE '%" + param.q + "%' OR a.unit_terkait LIKE '%" + param.q + "%' OR a.judul_report LIKE '%" + param.q + "%' OR a.kronologi_kejadian LIKE '%" + param.q + "%' OR a.temuan_investigasi LIKE '%" + param.q + "%' OR a.bukti_temuan LIKE '%" + param.q + "%' OR a.saksi_1 LIKE '%" + param.q + "%' OR a.saksi_2 LIKE '%" + param.q + "%' OR a.investigator LIKE '%" + param.q + "%' OR a.rincian_kegiatan LIKE '%" + param.q + "%' OR a.luka_sakit LIKE '%" + param.q + "%' OR a.wujud_cedera LIKE '%" + param.q + "%' OR a.bagian_tubuh_cedera LIKE '%" + param.q + "%' OR a.mekanisme_cedera LIKE '%" + param.q + "%' OR a.kerusakan_alat LIKE '%" + param.q + "%' OR a.uraian_kejadian LIKE '%" + param.q + "%' OR a.analisa_penyebab LIKE '%" + param.q + "%' OR a.peralatan_kelengkapan LIKE '%" + param.q + "%' OR a.alat_pelindung_diri LIKE '%" + param.q + "%' OR a.perilaku LIKE '%" + param.q + "%' OR a.kebersihan_kerapihan LIKE '%" + param.q + "%' OR a.peralatan_perlengkapan LIKE '%" + param.q + "%' OR a.kemampuan_kondisi_fisik LIKE '%" + param.q + "%' OR a.pemeliharaan_perbaikan LIKE '%" + param.q + "%' OR a.design LIKE '%" + param.q + "%' OR a.tingkat_kemampuan LIKE '%" + param.q + "%' OR a.penjagaan LIKE '%" + param.q + "%' OR a.tidandakan_terkait LIKE '%" + param.q + "%' OR a.faktor_utama_insiden LIKE '%" + param.q + "%' OR a.rekomendasi_tindakan LIKE '%" + param.q + "%' OR a.pihak_yang_bertanggungjawab LIKE '%" + param.q + "%' OR a.pelaksana LIKE '%" + param.q + "%' OR a.tanggal_pemeriksaan LIKE '%" + param.q + "%' OR a.nama LIKE '%" + param.q + "%' OR a.jabatan LIKE '%" + param.q + "%' OR a.status_investigasi_insiden_id LIKE '%" + param.q + "%' OR a.prepard_by LIKE '%" + param.q + "%' OR a.prepard_tanggal LIKE '%" + param.q + "%' OR a.reviewed_by LIKE '%" + param.q + "%' OR a.reviewed_tanggal LIKE '%" + param.q + "%' OR a.approved_by LIKE '%" + param.q + "%' OR a.approved_tanggal LIKE '%" + param.q + "%'";	
		wheres += ")";
    	query += wheres;
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
		investigasiinsiden = await setActivity(investigasiinsiden, id);

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

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE investigasi_insiden SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...investigasiinsiden });
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

