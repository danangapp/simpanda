const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const StatusAbsen = function (statusabsen) {
    this.nama = statusabsen.nama;
};

StatusAbsen.create = async(newStatusAbsen, result) => {
	try {
		const res = await query("INSERT INTO status_absen SET ?", newStatusAbsen);
		result(null, { id: res.insertId, ...newStatusAbsen });
	} catch (error) {
	    result(error, null);
	}
};

StatusAbsen.findById = (id, result) => {
    sql.query(`SELECT * FROM status_absen WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found StatusAbsen with the id
        result({ kind: "not_found" }, null);
    });
};

StatusAbsen.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM status_absen a";
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

StatusAbsen.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_absen'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

StatusAbsen.updateById = async(id, statusabsen, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in statusabsen) {
		    if (statusabsen[i]) {
		        str += i + " = ?, ";
		        obj.push(statusabsen[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("INSERT INTO activity_log SET ?", objek);
		await query("UPDATE status_absen SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...statusabsen });
	} catch (error) {
	    result(error, null);
	}
};

StatusAbsen.remove = (id, result) => {
    sql.query("DELETE FROM status_absen WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusAbsen with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = StatusAbsen;

