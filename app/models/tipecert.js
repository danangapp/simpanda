const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const TipeCert = function (tipecert) {
    this.nama = tipecert.nama;
    this.remark = tipecert.remark;
    this.jenis_cert_id = tipecert.jenis_cert_id;
};

TipeCert.create = async(newTipeCert, result) => {
	try {
		const res = await query("INSERT INTO tipe_cert SET ?", newTipeCert);
		result(null, { id: res.insertId, ...newTipeCert });
	} catch (error) {
	    result(error, null);
	}
};

TipeCert.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as jenis_cert FROM tipe_cert a  LEFT JOIN jenis_cert a1 ON a.jenis_cert_id = a1.id  WHERE a.id = ${id}`, (err, res) => {
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
    var wheres = "";
    var query = "SELECT a.* , a1.nama as jenis_cert FROM tipe_cert a  LEFT JOIN jenis_cert a1 ON a.jenis_cert_id = a1.id ";
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
		wheres += "a.nama LIKE '%" + param.q + "%' OR a.remark LIKE '%" + param.q + "%' OR a.jenis_cert_id LIKE '%" + param.q + "%'";	
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
		var arr = ["nama", "remark", "jenis_cert_id"];
		for (var i in tipecert) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (tipecert[i] && adadiTable == 1) {
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

