const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const EvaluasiPelimpahan = function (evaluasipelimpahan) {
    this.approval_status_id = evaluasipelimpahan.approval_status_id;
    this.enable = evaluasipelimpahan.enable;
    this.cabang_id = evaluasipelimpahan.cabang_id;
    this.bup = evaluasipelimpahan.bup;
    this.izin_bup = evaluasipelimpahan.izin_bup;
    this.penetapan_perairan_pandu = evaluasipelimpahan.penetapan_perairan_pandu;
    this.izin_pelimpahan = evaluasipelimpahan.izin_pelimpahan;
    this.pengawas_pemanduan = evaluasipelimpahan.pengawas_pemanduan;
    this.laporan_bulanan = evaluasipelimpahan.laporan_bulanan;
    this.bukti_pembayaran_pnpb = evaluasipelimpahan.bukti_pembayaran_pnpb;
    this.sispro = evaluasipelimpahan.sispro;
    this.tarif_jasa_pandu_tunda = evaluasipelimpahan.tarif_jasa_pandu_tunda;
    this.data_dukung = evaluasipelimpahan.data_dukung;
    this.file_pendukung = evaluasipelimpahan.file_pendukung;
    this.tanggal_sk = evaluasipelimpahan.tanggal_sk;
    this.file_sk_pelimpahan = evaluasipelimpahan.file_sk_pelimpahan;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'evaluasipelimpahan';
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

EvaluasiPelimpahan.create = async(newEvaluasiPelimpahan, result) => {
	try {
		newEvaluasiPelimpahan = setActivity(newEvaluasiPelimpahan);
		const res = await query("INSERT INTO evaluasi_pelimpahan SET ?", newEvaluasiPelimpahan);
		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newEvaluasiPelimpahan });
	} catch (error) {
	    result(error, null);
	}
};

EvaluasiPelimpahan.findById = async (id, result) => {
const resQuery = await query("SELECT pemeriksaan_kapal_check_id, tanggal_awal, tanggal_akhir, keterangan FROM pemeriksaan_kapal_check_data WHERE pemeriksaan_kapal_id = '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama as cabang FROM evaluasi_pelimpahan a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN cabang a3 ON a.cabang_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found EvaluasiPelimpahan with the id
        result({ kind: "not_found" }, null);
    });
};

EvaluasiPelimpahan.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama as cabang FROM evaluasi_pelimpahan a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN cabang a3 ON a.cabang_id = a3.id ";
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
		wheres += "a.approval_status_id LIKE '%1234%' OR a.enable LIKE '%1234%' OR a.cabang_id LIKE '%1234%' OR a.bup LIKE '%1234%' OR a.izin_bup LIKE '%1234%' OR a.penetapan_perairan_pandu LIKE '%1234%' OR a.izin_pelimpahan LIKE '%1234%' OR a.pengawas_pemanduan LIKE '%1234%' OR a.laporan_bulanan LIKE '%1234%' OR a.bukti_pembayaran_pnpb LIKE '%1234%' OR a.sispro LIKE '%1234%' OR a.tarif_jasa_pandu_tunda LIKE '%1234%' OR a.data_dukung LIKE '%1234%' OR a.file_pendukung LIKE '%1234%' OR a.tanggal_sk LIKE '%1234%' OR a.file_sk_pelimpahan LIKE '%1234%'";	
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

EvaluasiPelimpahan.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'evaluasi_pelimpahan'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

EvaluasiPelimpahan.updateById = async(id, evaluasipelimpahan, result) => {
	try {
		evaluasipelimpahan = await setActivity(evaluasipelimpahan, id);

		var str = "", obj = [], no = 1;
		for (var i in evaluasipelimpahan) {
		    if (evaluasipelimpahan[i]) {
		        str += i + " = ?, ";
		        obj.push(evaluasipelimpahan[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE evaluasi_pelimpahan SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...evaluasipelimpahan });
	} catch (error) {
	    result(error, null);
	}
};

EvaluasiPelimpahan.remove = (id, result) => {
    sql.query("DELETE FROM evaluasi_pelimpahan WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found EvaluasiPelimpahan with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = EvaluasiPelimpahan;

