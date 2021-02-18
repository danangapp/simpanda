const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const ActivityLog = function (activitylog) {
    this.date = activitylog.date;
    this.item = activitylog.item;
    this.action = activitylog.action;
    this.user_id = activitylog.user_id;
    this.remark = activitylog.remark;
    this.koneksi = activitylog.koneksi;
};

ActivityLog.create = async(newActivityLog, result) => {
	try {
		const res = await query("INSERT INTO activity_log SET ?", newActivityLog);
		result(null, { id: res.insertId, ...newActivityLog });
	} catch (error) {
	    result(error, null);
	}
};

ActivityLog.findById = async (id, result) => {
const resQuery = await query("SELECT pemeriksaan_kapal_check_id, tanggal_awal, tanggal_akhir, keterangan FROM pemeriksaan_kapal_check_data WHERE pemeriksaan_kapal_id = '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as user FROM activity_log a  LEFT JOIN user a1 ON a.user_id = a1.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found ActivityLog with the id
        result({ kind: "not_found" }, null);
    });
};

ActivityLog.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as user FROM activity_log a  LEFT JOIN user a1 ON a.user_id = a1.id ";
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
		wheres += "a.date LIKE '%1234%' OR a.item LIKE '%1234%' OR a.action LIKE '%1234%' OR a.user_id LIKE '%1234%' OR a.remark LIKE '%1234%' OR a.koneksi LIKE '%1234%'";	
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

ActivityLog.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'activity_log'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

ActivityLog.updateById = async(id, activitylog, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in activitylog) {
		    if (activitylog[i]) {
		        str += i + " = ?, ";
		        obj.push(activitylog[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE activity_log SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...activitylog });
	} catch (error) {
	    result(error, null);
	}
};

ActivityLog.remove = (id, result) => {
    sql.query("DELETE FROM activity_log WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ActivityLog with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = ActivityLog;

