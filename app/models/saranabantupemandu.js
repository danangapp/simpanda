const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const SaranaBantuPemandu = function (saranabantupemandu) {
    this.approval_status_id = saranabantupemandu.approval_status_id;
    this.cabang_id = saranabantupemandu.cabang_id;
    this.tanggal_pemeriksaan = saranabantupemandu.tanggal_pemeriksaan;
    this.pelaksana = saranabantupemandu.pelaksana;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'saranabantupemandu';
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

SaranaBantuPemandu.create = async(newSaranaBantuPemandu, result) => {
	try {
		newSaranaBantuPemandu = setActivity(newSaranaBantuPemandu);
		const res = await query("INSERT INTO sarana_bantu_pemandu SET ?", newSaranaBantuPemandu);
		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newSaranaBantuPemandu });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemandu.findById = async (id, result) => {
	const resActivityLog = await query("SELECT a.date, a.item, a.action, a.user_id, a.remark, a.koneksi FROM activity_log a INNER JOIN sarana_bantu_pemandu b ON a.item = 'sarana_bantu_pemandu' AND a.koneksi = b.id WHERE b.id =  '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as approval_status, a2.nama as cabang FROM sarana_bantu_pemandu a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN cabang a2 ON a.cabang_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
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

        // not found SaranaBantuPemandu with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemandu.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as approval_status, a2.nama as cabang FROM sarana_bantu_pemandu a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN cabang a2 ON a.cabang_id = a2.id ";
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
		wheres += "a.approval_status_id LIKE '%" + param.q + "%' OR a.cabang_id LIKE '%" + param.q + "%' OR a.tanggal_pemeriksaan LIKE '%" + param.q + "%' OR a.pelaksana LIKE '%" + param.q + "%'";	
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

SaranaBantuPemandu.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

SaranaBantuPemandu.updateById = async(id, saranabantupemandu, result) => {
	try {
		saranabantupemandu = await setActivity(saranabantupemandu, id);

		var str = "", obj = [], no = 1;
		var arr = ["approval_status_id", "cabang_id", "tanggal_pemeriksaan", "pelaksana"];
		for (var i in saranabantupemandu) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (saranabantupemandu[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(saranabantupemandu[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE sarana_bantu_pemandu SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...saranabantupemandu });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemandu.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemandu with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = SaranaBantuPemandu;

