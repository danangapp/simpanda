const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const TipePersonil = function (tipepersonil) {
    this.nama = tipepersonil.nama;
    this.flag = tipepersonil.flag;
};

TipePersonil.create = async(newTipePersonil, result) => {
	try {
		const res = await query("INSERT INTO tipe_personil SET ?", newTipePersonil);
		result(null, { id: res.insertId, ...newTipePersonil });
	} catch (error) {
	    result(error, null);
	}
};

TipePersonil.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM tipe_personil a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipePersonil with the id
        result({ kind: "not_found" }, null);
    });
};

TipePersonil.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM tipe_personil a ";
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
		wheres += "a.nama LIKE '%" + param.q + "%' OR a.flag LIKE '%" + param.q + "%'";	
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

TipePersonil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

TipePersonil.updateById = async(id, tipepersonil, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["nama", "flag"];
		for (var i in tipepersonil) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (tipepersonil[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(tipepersonil[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE tipe_personil SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...tipepersonil });
	} catch (error) {
	    result(error, null);
	}
};

TipePersonil.remove = (id, result) => {
    sql.query("DELETE FROM tipe_personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipePersonil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = TipePersonil;

