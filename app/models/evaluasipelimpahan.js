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
	const resActivityLog = await query("SELECT a.date, a.item, a.action, a.user_id, a.remark, a.koneksi FROM activity_log a INNER JOIN evaluasi_pelimpahan b ON a.item = 'evaluasi_pelimpahan' AND a.koneksi = b.id WHERE b.id =  '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama as cabang FROM evaluasi_pelimpahan a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN cabang a3 ON a.cabang_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

		const activityLog = { "activityLog": resActivityLog }
		let merge = { ...res[0], ...activityLog }	
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
					var wherein = "";
					for (var x in str) {
					    wherein += str[x] + ", ";
					}
					wherein = wherein.substring(0, wherein.length - 2);
					wheres += "a." + i + " IN (" + wherein + ")";
					wheres += " and ";
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
		wheres += wheres.length == 7 ? "(" : "AND (";
		wheres += "a.approval_status_id LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%' OR a.cabang_id LIKE '%" + param.q + "%' OR a.bup LIKE '%" + param.q + "%' OR a.izin_bup LIKE '%" + param.q + "%' OR a.penetapan_perairan_pandu LIKE '%" + param.q + "%' OR a.izin_pelimpahan LIKE '%" + param.q + "%' OR a.pengawas_pemanduan LIKE '%" + param.q + "%' OR a.laporan_bulanan LIKE '%" + param.q + "%' OR a.bukti_pembayaran_pnpb LIKE '%" + param.q + "%' OR a.sispro LIKE '%" + param.q + "%' OR a.tarif_jasa_pandu_tunda LIKE '%" + param.q + "%' OR a.data_dukung LIKE '%" + param.q + "%' OR a.file_pendukung LIKE '%" + param.q + "%' OR a.tanggal_sk LIKE '%" + param.q + "%' OR a.file_sk_pelimpahan LIKE '%" + param.q + "%'";	
		wheres += ")";
   }

   query += wheres;
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
		var arr = ["approval_status_id", "enable", "cabang_id", "bup", "izin_bup", "penetapan_perairan_pandu", "izin_pelimpahan", "pengawas_pemanduan", "laporan_bulanan", "bukti_pembayaran_pnpb", "sispro", "tarif_jasa_pandu_tunda", "data_dukung", "file_pendukung", "tanggal_sk", "file_sk_pelimpahan"];
		for (var i in evaluasipelimpahan) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (evaluasipelimpahan[i] && adadiTable == 1) {
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

