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

Personil.create = async (newPersonil, result) => {
	try {
		const sertifikat = newPersonil.sertifikat;
		for (var i in sertifikat) {
			const x = sertifikat[i];

			var header = "", value = "";
			for (var a in x) {
				const val = x[a];
				header += a + ", ";
				if (a != "sertifikat") {
					value += "'" + val + "', ";
				} else {
					var fileName = f.uploadFile64('personil', val);
					value += "'" + fileName + "', ";
				}
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

Personil.findById = async (id, result) => {
	const resQuery = await query("SELECT a.*, c.nama as tipe_cert, d.nama as jenis_cert FROM sertifikat a INNER JOIN personil b ON a.personil_id = b.id INNER JOIN tipe_cert c ON a.tipe_cert_id = c.id INNER JOIN jenis_cert d ON c.jenis_cert_id = d.id WHERE b.id =  '" + id + "'");
	const resActivityLog = await query("SELECT a.date, a.item, a.action, a.user_id, a.remark, a.koneksi FROM activity_log a INNER JOIN personil b ON a.item = 'personil' AND a.koneksi = b.id WHERE b.id =  '" + id + "'");
	sql.query(`SELECT a.* , a1.nama as tipe_personil, a2.nama as approval_status, a3.nama as ena, a4.nama_asset as asset_kapal, a5.nama as status_kepegawaian, a6.nama as cabang FROM personil a  LEFT JOIN tipe_personil a1 ON a.tipe_personil_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id  LEFT JOIN asset_kapal a4 ON a.asset_kapal_id = a4.id  LEFT JOIN status_kepegawaian a5 ON a.status_kepegawaian_id = a5.id  LEFT JOIN cabang a6 ON a.tempat_tugas = a6.id  WHERE a.id = ${id}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		const sertifikat = { "sertifikat": resQuery }
		const activityLog = { "activityLog": resActivityLog }
		let merge = { ...res[0], ...sertifikat, ...activityLog }
		if (res.length) {
			result(null, merge);
			return;
		}

		// not found Personil with the id
		result({ kind: "not_found" }, null);
	});
};

Personil.getAll = (param, result) => {
	const length = Object.keys(param).length;
	var wheres = "";
	var query = "SELECT a.* , a1.nama as tipe_personil, a2.nama as approval_status, a3.nama as ena, a4.nama_asset as asset_kapal, a5.nama as status_kepegawaian, a6.nama as cabang FROM personil a  LEFT JOIN tipe_personil a1 ON a.tipe_personil_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id  LEFT JOIN asset_kapal a4 ON a.asset_kapal_id = a4.id  LEFT JOIN status_kepegawaian a5 ON a.status_kepegawaian_id = a5.id  LEFT JOIN cabang a6 ON a.tempat_tugas = a6.id ";
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

		if (wheres.length > 7) {
			wheres = wheres.substring(0, wheres.length - 5);
		}
	}

	if (param.q) {
		wheres += wheres.length == 7 ? "(" : "AND (";
		wheres += "a.tipe_personil_id LIKE '%" + param.q + "%' OR a.approval_status_id LIKE '%" + param.q + "%' OR a.simop_kd_pers_pandu LIKE '%" + param.q + "%' OR a.simop_kd_pers_pandu_cbg LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%' OR a.asset_kapal_id LIKE '%" + param.q + "%' OR a.nama LIKE '%" + param.q + "%' OR a.kelas LIKE '%" + param.q + "%' OR a.tempat_lahir LIKE '%" + param.q + "%' OR a.tanggal_lahir LIKE '%" + param.q + "%' OR a.nipp LIKE '%" + param.q + "%' OR a.jabatan LIKE '%" + param.q + "%' OR a.status_kepegawaian_id LIKE '%" + param.q + "%' OR a.cv LIKE '%" + param.q + "%' OR a.tempat_tugas LIKE '%" + param.q + "%' OR a.nomor_sk LIKE '%" + param.q + "%' OR a.tanggal_mulai LIKE '%" + param.q + "%' OR a.tanggal_selesai LIKE '%" + param.q + "%' OR a.sk LIKE '%" + param.q + "%' OR a.skpp LIKE '%" + param.q + "%' OR a.surat_kesehatan LIKE '%" + param.q + "%' OR a.sertifikat_id LIKE '%" + param.q + "%'";
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

Personil.updateById = async (id, personil, result) => {
	const sertifikat = personil.sertifikat;
	var arr = ["id", "jenis_cert_id", "tipe_cert_id", "personil_id", "asset_kapal_id", "no_sertifikat", "issuer", "tempat_keluar_sertifikat", "tanggal_keluar_sertifikat", "tanggal_expire", "reminder_date1", "reminder_date3", "reminder_date6", "sertifikat", "sertifikat_id"]
	for (var i in sertifikat) {
		const x = sertifikat[i];

		var header = "", value = "";
		for (var a in x) {
			const val = x[a];
			var adadiTable = 0
			for (var b in arr) {
				if (a == arr[b]) {
					adadiTable = 1;
					break;
				}
			}

			if (adadiTable == 1) {
				header += a + ", ";
				value += "'" + val + "', ";
			}
		}

		value = value.substring(0, value.length - 2);
		header = header.substring(0, header.length - 2);
		try {
			await query("DELETE FROM sertifikat WHERE id='" + x.id + "'");
		} catch (error) {
			result(error, null);
			break;
		}

		try {
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		} catch (error) {
			result(error, null);
			break;
		}
	}
	delete personil.sertifikat;
	personil = await setActivity(personil, id);

	var str = "", obj = [], no = 1;
	var arr = ["tipe_personil_id", "approval_status_id", "simop_kd_pers_pandu", "simop_kd_pers_pandu_cbg", "enable", "asset_kapal_id", "nama", "kelas", "tempat_lahir", "tanggal_lahir", "nipp", "jabatan", "status_kepegawaian_id", "cv", "tempat_tugas", "nomor_sk", "tanggal_mulai", "tanggal_selesai", "sk", "skpp", "surat_kesehatan", "sertifikat_id"];
	for (var i in personil) {
		var adadiTable = 0
		for (var b in arr) {
			if (i == arr[b]) {
				adadiTable = 1;
				break;
			}
		}
		if (personil[i] && adadiTable == 1) {
			str += i + " = ?, ";
			obj.push(personil[i]);
		}
		no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

	if (objek.action != null) {
		try {
			await query("INSERT INTO activity_log SET ?", objek);
		} catch (error) {
			result(error, null);
		}
	}

	try {
		await query("UPDATE personil SET " + str + " WHERE id = ?", obj);
	} catch (error) {
		result(error, null);
	}
	result(null, { id: id, ...personil });

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

