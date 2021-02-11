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
    this.dile_pendukung = evaluasipelimpahan.dile_pendukung;
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

EvaluasiPelimpahan.findById = (id, result) => {
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
    var query = "SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama as cabang FROM evaluasi_pelimpahan a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN cabang a3 ON a.cabang_id = a3.id ";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += "a." + i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += "a." + i + " ='" + param[i] + "' and ";
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

