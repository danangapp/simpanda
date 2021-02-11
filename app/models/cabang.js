const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Cabang = function (cabang) {
    this.nama = cabang.nama;
    this.almt_cabang = cabang.almt_cabang;
    this.cabang_cms = cabang.cabang_cms;
    this.no_account_cabang = cabang.no_account_cabang;
    this.nm_cabang_3digit = cabang.nm_cabang_3digit;
    this.kd_account_cabang = cabang.kd_account_cabang;
    this.kd_cabang_jai_puspel = cabang.kd_cabang_jai_puspel;
    this.orgid = cabang.orgid;
    this.port_code = cabang.port_code;
    this.autospk = cabang.autospk;
    this.kd_jenis_pelabuhan = cabang.kd_jenis_pelabuhan;
};

Cabang.create = async(newCabang, result) => {
	try {
		const res = await query("INSERT INTO cabang SET ?", newCabang);
		result(null, { id: res.insertId, ...newCabang });
	} catch (error) {
	    result(error, null);
	}
};

Cabang.findById = (id, result) => {
    sql.query(`SELECT a.*  FROM cabang a  WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Cabang with the id
        result({ kind: "not_found" }, null);
    });
};

Cabang.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM cabang a ";
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

Cabang.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'cabang'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Cabang.updateById = async(id, cabang, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in cabang) {
		    if (cabang[i]) {
		        str += i + " = ?, ";
		        obj.push(cabang[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE cabang SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...cabang });
	} catch (error) {
	    result(error, null);
	}
};

Cabang.remove = (id, result) => {
    sql.query("DELETE FROM cabang WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Cabang with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Cabang;

