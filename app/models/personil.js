const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Personil = function (personil) {
    this.tipe_personil_id = personil.tipe_personil_id;
    this.approval_status_id = personil.approval_status_id;
    this.simop_kd_pers_pandu = personil.simop_kd_pers_pandu;
    this.simop_kd_pers_pandu_cbg = personil.simop_kd_pers_pandu_cbg;
    this.enable = personil.enable;
    this.asset_kapal_id = personil.asset_kapal_id;
    this.nama = personil.nama;
    this.kelas = personil.kelas;
    this.tempat_lahir = personil.tempat_lahir;
    this.tanggal_lahir = personil.tanggal_lahir;
    this.nipp = personil.nipp;
    this.jabatan = personil.jabatan;
    this.status_kepegawaian_id = personil.status_kepegawaian_id;
    this.cv = personil.cv;
    this.tempat_tugas = personil.tempat_tugas;
    this.nomor_sk = personil.nomor_sk;
    this.tanggal_mulai = personil.tanggal_mulai;
    this.tanggal_selesai = personil.tanggal_selesai;
    this.sk = personil.sk;
    this.skpp = personil.skpp;
    this.surat_kesehatan = personil.surat_kesehatan;
    this.sertifikat = personil.sertifikat;
    this.date = personil.date;
    this.item = personil.item;
    this.action = personil.action;
    this.user_id = personil.user_id;
    this.remark = personil.remark;
    this.koneksi = personil.koneksi;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'personil';
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

Personil.create = async(newPersonil, result) => {
	try {
		const sertifikat = newPersonil.sertifikat;
		for (var i in sertifikat) {
		    const x = sertifikat[i];
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
		        value += "'" + val + "', ";
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		}

		delete newPersonil.sertifikat;
		newPersonil = setActivity(newPersonil);
		const res = await query("INSERT INTO personil SET ?", newPersonil);
		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newPersonil });
	} catch (error) {
	    result(error, null);
	}
};

Personil.findById = (id, result) => {
    sql.query(`SELECT a.* , a1.nama as tipe_personil, a2.nama as approval_status, a3.nama as ena, a4.nama_asset as asset_kapal, a5.nama as status_kepegawaian, a6.nama as cabang FROM personil a  LEFT JOIN tipe_personil a1 ON a.tipe_personil_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id  LEFT JOIN asset_kapal a4 ON a.asset_kapal_id = a4.id  LEFT JOIN status_kepegawaian a5 ON a.status_kepegawaian_id = a5.id  LEFT JOIN cabang a6 ON a.tempat_tugas = a6.id  WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Personil with the id
        result({ kind: "not_found" }, null);
    });
};

Personil.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as tipe_personil, a2.nama as approval_status, a3.nama as ena, a4.nama_asset as asset_kapal, a5.nama as status_kepegawaian, a6.nama as cabang FROM personil a  LEFT JOIN tipe_personil a1 ON a.tipe_personil_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id  LEFT JOIN asset_kapal a4 ON a.asset_kapal_id = a4.id  LEFT JOIN status_kepegawaian a5 ON a.status_kepegawaian_id = a5.id  LEFT JOIN cabang a6 ON a.tempat_tugas = a6.id ";
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

Personil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Personil.updateById = async(id, personil, result) => {
	try {
		const sertifikat = personil.sertifikat;
		for (var i in sertifikat) {
		    const x = sertifikat[i];
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
		        value += "'" + val + "', ";
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
		
			await query("DELETE FROM sertifikat WHERE id = ?", x.id);
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		}
		delete personil.sertifikat;
		personil = await setActivity(personil, id);

		var str = "", obj = [], no = 1;
		for (var i in personil) {
		    if (personil[i]) {
		        str += i + " = ?, ";
		        obj.push(personil[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE personil SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
	} catch (error) {
	    result(error, null);
	}
};

Personil.remove = (id, result) => {
    sql.query("DELETE FROM personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Personil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Personil;

