const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const TipePersonil = function (tipepersonil) {
    this.nama = tipepersonil.nama;
};

TipePersonil.create = async(newTipePersonil, result) => {
	try {
		const res = await query("INSERT INTO tipe_personil SET ?", newTipePersonil);
		result(null, { id: res.insertId, ...newTipePersonil });
	} catch (error) {
	    result(error, null);
	}
};

TipePersonil.findById = (id, result) => {
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
        	        wheres += "(";
        	        for (var x in str) {
        	            wheres += "a." + i + " ='" + str[x] + "' or ";
        	        }
        	        wheres = wheres.substring(0, wheres.length - 4);
        	        wheres += ") and ";
        	    } else {
        	        wheres += "a." + i + " ='" + param[i] + "' and ";
        	    }
        	}
        }

        if (wheres.length > 7){
        	wheres = wheres.substring(0, wheres.length - 5);
        }
    }

	wheres += wheres.length == 7 ? "(" : "OR (";
	wheres += "a.nama LIKE '%1234%'";	
	wheres += ")";
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
		for (var i in tipepersonil) {
		    if (tipepersonil[i]) {
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

