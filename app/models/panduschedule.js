const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const PanduSchedule = function (panduschedule) {
	this.date = panduschedule.date;
	this.cabang_id = panduschedule.cabang_id;
	this.status_absen_id = panduschedule.status_absen_id;
	this.keterangan = panduschedule.keterangan;
	this.approval_status_id = panduschedule.approval_status_id;
	this.enable = panduschedule.enable;
	this.pandu_jaga_id = panduschedule.pandu_jaga_id;
	this.pandu_bandar_laut_id = panduschedule.pandu_bandar_laut_id;
};

const setActivity = (objects, koneksi = 1) => {
	objek.date = f.toDate(objects.date);
	objek.item = 'panduschedule';
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

PanduSchedule.create = async (newPanduSchedule, result) => {
	try {

		// result(null, { id: 1 });
		for (var a in newPanduSchedule) {
			var header = "", value = "";
			var c = newPanduSchedule[a];
			for (var b in c) {
				if (b != "pandu_jaga") {
					header += b + ", ";
					value += "'" + c[b] + "', ";
				}
			}

			value = value.substring(0, value.length - 2);
			header = header.substring(0, header.length - 2);
			var res = await query("INSERT INTO pandu_schedule (" + header + ") values (" + value + ")");

			for (var b in c) {
				if (b === "pandu_jaga") {
					var e = c[b];
					for (var d in e) {
						var g = e[d];
						g['pandu_schedule_id'] = res.insertId;
						console.log(g);
						var header1 = "", value1 = "";
						for (var f in g) {
							header1 += f + ", ";
							value1 += "'" + g[f] + "', ";
						}

						value1 = value1.substring(0, value1.length - 2);
						header1 = header1.substring(0, header1.length - 2);
						await query("INSERT INTO pandu_jaga (" + header1 + ") values (" + value1 + ")");
					}
				}
			}
		}

		result(null, newPanduSchedule);
	} catch (error) {
		result(error, null);
	}
};

PanduSchedule.findById = async (id, result) => {
	const resQuery = await query("SELECT * FROM pandu_jaga WHERE pandu_schedule_id = '" + id + "'");
	const resActivityLog = await query("SELECT a.date, a.item, a.action, a.user_id, a.remark, a.koneksi FROM activity_log a INNER JOIN pandu_schedule b ON a.item = 'pandu_schedule' AND a.koneksi = b.id WHERE b.id =  '" + id + "'");
	sql.query(`SELECT a.* , a1.nama as cabang, a2.nama as status_absen, a3.nama as approval_status, a4.nama as ena, a5.nama as pandu_bandar_laut FROM pandu_schedule a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id  LEFT JOIN status_absen a2 ON a.status_absen_id = a2.id  LEFT JOIN approval_status a3 ON a.approval_status_id = a3.id  LEFT JOIN enable a4 ON a.enable = a4.id  LEFT JOIN pandu_bandar_laut a5 ON a.pandu_bandar_laut_id = a5.id  WHERE a.id = ${id}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		const pandu_jaga = { "pandu_jaga": resQuery }
		const activityLog = { "activityLog": resActivityLog }
		let merge = { ...res[0], ...pandu_jaga }
		if (res.length) {
			result(null, merge);
			return;
		}

		// not found PanduSchedule with the id
		result({ kind: "not_found" }, null);
	});
};

PanduSchedule.getAll = (param, result) => {
	const length = Object.keys(param).length;
	var wheres = "";
	var query = "SELECT a.* , a1.nama as cabang, a2.nama as status_absen, a3.nama as approval_status, a4.nama as ena, a5.nama as pandu_bandar_laut FROM pandu_schedule a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id  LEFT JOIN status_absen a2 ON a.status_absen_id = a2.id  LEFT JOIN approval_status a3 ON a.approval_status_id = a3.id  LEFT JOIN enable a4 ON a.enable = a4.id  LEFT JOIN pandu_bandar_laut a5 ON a.pandu_bandar_laut_id = a5.id ";
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
		wheres += "a.date LIKE '%" + param.q + "%' OR a.cabang_id LIKE '%" + param.q + "%' OR a.status_absen_id LIKE '%" + param.q + "%' OR a.keterangan LIKE '%" + param.q + "%' OR a.approval_status_id LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%' OR a.pandu_jaga_id LIKE '%" + param.q + "%' OR a.pandu_bandar_laut_id LIKE '%" + param.q + "%'";
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

PanduSchedule.design = result => {
	sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pandu_schedule'", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		result(null, res);
	});
};

PanduSchedule.updateById = async (panduschedule, result) => {
	try {

		for (var a in panduschedule) {
			var c = panduschedule[a];
			var str = "";
			for (var b in c) {
				if (b != "pandu_jaga" && b != "pandu_schedule_id") {
					str += b + "='" + c[b] + "', ";
				}
			}

			str = str.substring(0, str.length - 2);
			await query("UPDATE pandu_schedule SET " + str + " WHERE id = '" + c['pandu_schedule_id'] + "'");
			await query("DELETE FROM pandu_jaga WHERE pandu_schedule_id = '" + c['pandu_schedule_id'] + "'");

			for (var b in c) {
				if (b === "pandu_jaga") {
					var e = c[b];
					for (var d in e) {
						var g = e[d];
						g['pandu_schedule_id'] = c['pandu_schedule_id'];
						var header1 = "", value1 = "";
						for (var f in g) {
							header1 += f + ", ";
							value1 += "'" + g[f] + "', ";
						}

						value1 = value1.substring(0, value1.length - 2);
						header1 = header1.substring(0, header1.length - 2);
						await query("INSERT INTO pandu_jaga (" + header1 + ") values (" + value1 + ")");
					}
				}
			}
		}

		result(null, panduschedule);
	} catch (error) {
		result(error, null);
	}
};

PanduSchedule.remove = (id, result) => {
	sql.query("DELETE FROM pandu_schedule WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found PanduSchedule with the id
			result({ kind: "not_found" }, null);
			return;
		}

		result(null, res);
	});
};

module.exports = PanduSchedule;

