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
		wheres += "a.date LIKE '%" + param.q + "%' OR a.item LIKE '%" + param.q + "%' OR a.action LIKE '%" + param.q + "%' OR a.user_id LIKE '%" + param.q + "%' OR a.remark LIKE '%" + param.q + "%' OR a.koneksi LIKE '%" + param.q + "%'";	
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
		var arr = ["date", "item", "action", "user_id", "remark", "koneksi"];
		for (var i in activitylog) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (activitylog[i] && adadiTable == 1) {
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

