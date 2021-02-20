const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const KondisiUmum = function (kondisiumum) {
    this.nama = kondisiumum.nama;
};

KondisiUmum.create = async(newKondisiUmum, result) => {
	try {
		const res = await query("INSERT INTO kondisi_umum SET ?", newKondisiUmum);
		result(null, { id: res.insertId, ...newKondisiUmum });
	} catch (error) {
	    result(error, null);
	}
};

KondisiUmum.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM kondisi_umum a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found KondisiUmum with the id
        result({ kind: "not_found" }, null);
    });
};

KondisiUmum.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM kondisi_umum a ";
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

KondisiUmum.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'kondisi_umum'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

KondisiUmum.updateById = async(id, kondisiumum, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in kondisiumum) {
		    if (kondisiumum[i]) {
		        str += i + " = ?, ";
		        obj.push(kondisiumum[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE kondisi_umum SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...kondisiumum });
	} catch (error) {
	    result(error, null);
	}
};

KondisiUmum.remove = (id, result) => {
    sql.query("DELETE FROM kondisi_umum WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found KondisiUmum with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = KondisiUmum;

