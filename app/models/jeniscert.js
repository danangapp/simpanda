const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const JenisCert = function (jeniscert) {
    this.nama = jeniscert.nama;
    this.remark = jeniscert.remark;
};

JenisCert.create = async(newJenisCert, result) => {
	try {
		const res = await query("INSERT INTO jenis_cert SET ?", newJenisCert);
		result(null, { id: res.insertId, ...newJenisCert });
	} catch (error) {
	    result(error, null);
	}
};

JenisCert.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM jenis_cert a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found JenisCert with the id
        result({ kind: "not_found" }, null);
    });
};

JenisCert.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM jenis_cert a ";
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
		wheres += "a.nama LIKE '%" + param.q + "%' OR a.remark LIKE '%" + param.q + "%'";	
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

JenisCert.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'jenis_cert'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

JenisCert.updateById = async(id, jeniscert, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["nama", "remark"];
		for (var i in jeniscert) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (jeniscert[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(jeniscert[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE jenis_cert SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...jeniscert });
	} catch (error) {
	    result(error, null);
	}
};

JenisCert.remove = (id, result) => {
    sql.query("DELETE FROM jenis_cert WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found JenisCert with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = JenisCert;

