const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Kondisi = function (kondisi) {
    this.nama = kondisi.nama;
};

Kondisi.create = async(newKondisi, result) => {
	try {
		const res = await query("INSERT INTO kondisi SET ?", newKondisi);
		result(null, { id: res.insertId, ...newKondisi });
	} catch (error) {
	    result(error, null);
	}
};

Kondisi.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM kondisi a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

		let merge = [{ ...res[0] }]	
        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Kondisi with the id
        result({ kind: "not_found" }, null);
    });
};

Kondisi.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM kondisi a ";
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

Kondisi.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'kondisi'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Kondisi.updateById = async(id, kondisi, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in kondisi) {
		    if (kondisi[i]) {
		        str += i + " = ?, ";
		        obj.push(kondisi[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE kondisi SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...kondisi });
	} catch (error) {
	    result(error, null);
	}
};

Kondisi.remove = (id, result) => {
    sql.query("DELETE FROM kondisi WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Kondisi with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Kondisi;

