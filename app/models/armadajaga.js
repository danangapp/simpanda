const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const ArmadaJaga = function (armadajaga) {
	this.tipe_asset_id = armadajaga.tipe_asset_id;
	this.asset_kapal_id = armadajaga.asset_kapal_id;
	this.armada_schedule_id = armadajaga.armada_schedule_id;
};

ArmadaJaga.create = async (newArmadaJaga, result) => {
	try {
		const armada_schedule = newArmadaJaga.armada_schedule;
		delete newArmadaJaga.armada_schedule;
		const res = await query("INSERT INTO armada_jaga SET ?", newArmadaJaga);
		for (var i in armada_schedule) {
			const x = armada_schedule[i];
			x['armada_jaga_id'] = res.insertId;

			var header = "", value = "";
			for (var a in x) {
				const val = x[a];
				header += a + ", ";
				value += "'" + val + "', ";
			}
			value = value.substring(0, value.length - 2);
			header = header.substring(0, header.length - 2);
			await query("INSERT INTO armada_schedule (" + header + ") values (" + value + ")");
		}

		result(null, { id: res.insertId, ...newArmadaJaga });
	} catch (error) {
		result(error, null);
	}
};

ArmadaJaga.findById = async (id, result) => {
	const resQuery = await query("SELECT * FROM armada_schedule WHERE armada_jaga_id = '" + id + "'");
	sql.query(`SELECT a.* , a1.nama as tipe_asset, a2.nama_asset as asset_kapal, a3.keterangan as armada_schedule FROM armada_jaga a  LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  LEFT JOIN armada_schedule a3 ON a.armada_schedule_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		const armada_schedule = { "armada_schedule": resQuery }
		let merge = { ...res[0], ...armada_schedule }
		if (res.length) {
			result(null, merge);
			return;
		}

		// not found ArmadaJaga with the id
		result({ kind: "not_found" }, null);
	});
};

ArmadaJaga.getAll = (param, result) => {
	const length = Object.keys(param).length;
	var wheres = "";
	var query = "SELECT a.* , a1.nama as tipe_asset, a2.nama_asset as asset_kapal, a3.keterangan as armada_schedule FROM armada_jaga a  LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  LEFT JOIN armada_schedule a3 ON a.armada_schedule_id = a3.id ";
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
					if (i == "nama" || i == "type" || i == "sarana_config_question" || i == "flag") {
						wheres += "a1." + i + " ='" + param[i] + "' and ";
					} else if (i == "cabang_id" || i == "simop_kd_fas" || i == "kepemilikan_kapal" || i == "simop_status_milik" || i == "simop_kd_agen" || i == "nama_asset" || i == "horse_power" || i == "tahun_perolehan" || i == "nilai_perolehan" || i == "enable" || i == "asset_number" || i == "simop_kd_puspel_jai" || i == "simop_new_puspel_jai" || i == "simop_new_asset_jai" || i == "approval_status_id" || i == "loa" || i == "tahun_pembuatan" || i == "breadth" || i == "kontruksi" || i == "depth" || i == "negara_pembuat" || i == "draft_max" || i == "daya" || i == "putaran" || i == "merk" || i == "tipe" || i == "daya_motor" || i == "daya_generator" || i == "putaran_spesifikasi" || i == "merk_spesifikasi" || i == "tipe_spesifikasi" || i == "klas" || i == "notasi_permesinan" || i == "no_registrasi" || i == "notasi_perlengkapan" || i == "port_of_registration" || i == "notasi_perairan" || i == "notasi_lambung" || i == "gross_tonnage" || i == "bolard_pull" || i == "kecepatan" || i == "ship_particular" || i == "sertifikat_id") {
						wheres += "a2." + i + " ='" + param[i] + "' and ";
					} else if (i == "date" || i == "cabang" || i == "status" || i == "jam_pengoperasian" || i == "reliability" || i == "keterangan" || i == "armada_jaga_id" || i == "asset_kapal_id") {
						wheres += "a3." + i + " ='" + param[i] + "' and ";
					} else {
						wheres += "a." + i + " ='" + param[i] + "' and ";
					}
				}
			}
		}

		if (wheres.length > 7) {
			wheres = wheres.substring(0, wheres.length - 5);
		}
	}

	if (param.q) {
		wheres += wheres.length == 7 ? "(" : "AND (";
		wheres += "a.tipe_asset_id LIKE '%" + param.q + "%' OR a.asset_kapal_id LIKE '%" + param.q + "%' OR a.armada_schedule_id LIKE '%" + param.q + "%'";
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

ArmadaJaga.design = result => {
	sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'armada_jaga'", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		result(null, res);
	});
};

ArmadaJaga.updateById = async (id, armadajaga, result) => {
	try {
		const armada_schedule = armadajaga.armada_schedule;
		var arr = ["date", "cabang", "tipe_asset_id", "asset_kapal_id", "status", "jam_pengoperasian", "reliability", "keterangan", "armada_jaga_id"]
		await query("DELETE FROM armada_schedule WHERE armada_jaga_id='" + id + "'");
		for (var i in armada_schedule) {
			const x = armada_schedule[i];

			var header = "", value = "";
			x['armada_jaga_id'] = id;
			for (var a in x) {
				var val = x[a];
				var adadiTable = 0
				for (var b in arr) {
					if (a == arr[b]) {
						adadiTable = 1;
						break;
					}
				}

				if (adadiTable == 1) {
					if (val) {
						header += a + ", ";
						value += "'" + val + "', ";
					}
				}
			}
			value = value.substring(0, value.length - 2);
			header = header.substring(0, header.length - 2);

			await query("INSERT INTO armada_schedule (" + header + ") values (" + value + ")");
		}
		delete armadajaga.armada_schedule;

		var str = "", obj = [], no = 1;
		var arr = ["tipe_asset_id", "asset_kapal_id", "armada_schedule_id"];
		for (var i in armadajaga) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
			if (armadajaga[i] && adadiTable == 1) {
				str += i + " = ?, ";
				obj.push(armadajaga[i]);
			}
			no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE armada_jaga SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...armadajaga });
	} catch (error) {
		result(error, null);
	}
};

ArmadaJaga.remove = (id, result) => {
	sql.query("DELETE FROM armada_jaga WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found ArmadaJaga with the id
			result({ kind: "not_found" }, null);
			return;
		}

		result(null, res);
	});
};

module.exports = ArmadaJaga;

