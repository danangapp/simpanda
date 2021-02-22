const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const PemeriksaanKapalCheck = function (pemeriksaankapalcheck) {
    this.question = pemeriksaankapalcheck.question;
};

PemeriksaanKapalCheck.create = async(newPemeriksaanKapalCheck, result) => {
	try {
		const res = await query("INSERT INTO pemeriksaan_kapal_check SET ?", newPemeriksaanKapalCheck);
		result(null, { id: res.insertId, ...newPemeriksaanKapalCheck });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapalCheck.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM pemeriksaan_kapal_check a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found PemeriksaanKapalCheck with the id
        result({ kind: "not_found" }, null);
    });
};

PemeriksaanKapalCheck.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM pemeriksaan_kapal_check a ";
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
		wheres += "a.question LIKE '%" + param.q + "%'";	
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

PemeriksaanKapalCheck.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pemeriksaan_kapal_check'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

PemeriksaanKapalCheck.updateById = async(id, pemeriksaankapalcheck, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["question"];
		for (var i in pemeriksaankapalcheck) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (pemeriksaankapalcheck[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(pemeriksaankapalcheck[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE pemeriksaan_kapal_check SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...pemeriksaankapalcheck });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapalCheck.remove = (id, result) => {
    sql.query("DELETE FROM pemeriksaan_kapal_check WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PemeriksaanKapalCheck with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = PemeriksaanKapalCheck;

