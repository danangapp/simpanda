const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const TipeCert = function (tipecert) {
    this.nama = tipecert.nama;
    this.remark = tipecert.remark;
};

TipeCert.create = async(newTipeCert, result) => {
	try {
		const res = await query("INSERT INTO tipe_cert SET ?", newTipeCert);
		result(null, { id: res.insertId, ...newTipeCert });
	} catch (error) {
	    result(error, null);
	}
};

TipeCert.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_cert WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipeCert with the id
        result({ kind: "not_found" }, null);
    });
};

TipeCert.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM tipe_cert a";
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

TipeCert.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_cert'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

TipeCert.updateById = async(id, tipecert, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in tipecert) {
		    if (tipecert[i]) {
		        str += i + " = ?, ";
		        obj.push(tipecert[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE tipe_cert SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...tipecert });
	} catch (error) {
	    result(error, null);
	}
};

TipeCert.remove = (id, result) => {
    sql.query("DELETE FROM tipe_cert WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeCert with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = TipeCert;

