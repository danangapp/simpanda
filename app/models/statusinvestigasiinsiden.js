const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const StatusInvestigasiInsiden = function (statusinvestigasiinsiden) {
    this.nama = statusinvestigasiinsiden.nama;
};

StatusInvestigasiInsiden.create = async(newStatusInvestigasiInsiden, result) => {
	try {
		const res = await query("INSERT INTO status_investigasi_insiden SET ?", newStatusInvestigasiInsiden);
		result(null, { id: res.insertId, ...newStatusInvestigasiInsiden });
	} catch (error) {
	    result(error, null);
	}
};

StatusInvestigasiInsiden.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM status_investigasi_insiden a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found StatusInvestigasiInsiden with the id
        result({ kind: "not_found" }, null);
    });
};

StatusInvestigasiInsiden.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM status_investigasi_insiden a ";
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
		wheres += "a.nama LIKE '%" + param.q + "%'";	
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

StatusInvestigasiInsiden.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_investigasi_insiden'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

StatusInvestigasiInsiden.updateById = async(id, statusinvestigasiinsiden, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["nama"];
		for (var i in statusinvestigasiinsiden) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (statusinvestigasiinsiden[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(statusinvestigasiinsiden[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE status_investigasi_insiden SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...statusinvestigasiinsiden });
	} catch (error) {
	    result(error, null);
	}
};

StatusInvestigasiInsiden.remove = (id, result) => {
    sql.query("DELETE FROM status_investigasi_insiden WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusInvestigasiInsiden with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = StatusInvestigasiInsiden;

