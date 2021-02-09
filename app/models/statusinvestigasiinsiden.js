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

StatusInvestigasiInsiden.findById = (id, result) => {
    sql.query(`SELECT * FROM status_investigasi_insiden WHERE id = ${id}`, (err, res) => {
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
    var query = "SELECT a.*  FROM status_investigasi_insiden a";
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
		for (var i in statusinvestigasiinsiden) {
		    if (statusinvestigasiinsiden[i]) {
		        str += i + " = ?, ";
		        obj.push(statusinvestigasiinsiden[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("INSERT INTO activity_log SET ?", objek);
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

