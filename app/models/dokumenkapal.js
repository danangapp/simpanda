const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const DokumenKapal = function (dokumenkapal) {
    this.nama = dokumenkapal.nama;
};

DokumenKapal.create = async(newDokumenKapal, result) => {
	try {
		const res = await query("INSERT INTO dokumen_kapal SET ?", newDokumenKapal);
		result(null, { id: res.insertId, ...newDokumenKapal });
	} catch (error) {
	    result(error, null);
	}
};

DokumenKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM dokumen_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found DokumenKapal with the id
        result({ kind: "not_found" }, null);
    });
};

DokumenKapal.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM dokumen_kapal a";
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

DokumenKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'dokumen_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

DokumenKapal.updateById = async(id, dokumenkapal, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in dokumenkapal) {
		    if (dokumenkapal[i]) {
		        str += i + " = ?, ";
		        obj.push(dokumenkapal[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("INSERT INTO activity_log SET ?", objek);
		await query("UPDATE dokumen_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...dokumenkapal });
	} catch (error) {
	    result(error, null);
	}
};

DokumenKapal.remove = (id, result) => {
    sql.query("DELETE FROM dokumen_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found DokumenKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = DokumenKapal;

