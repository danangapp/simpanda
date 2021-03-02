const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const InvestigasiInsidenTim = function (investigasiinsidentim) {
    this.nama = investigasiinsidentim.nama;
    this.jabatan = investigasiinsidentim.jabatan;
    this.tgl = investigasiinsidentim.tgl;
    this.status = investigasiinsidentim.status;
    this.investigasi_insiden_id = investigasiinsidentim.investigasi_insiden_id;
};

InvestigasiInsidenTim.create = async(newInvestigasiInsidenTim, result) => {
	try {
		const res = await query("INSERT INTO investigasi_insiden_tim SET ?", newInvestigasiInsidenTim);
		result(null, { id: res.insertId, ...newInvestigasiInsidenTim });
	} catch (error) {
	    result(error, null);
	}
};

InvestigasiInsidenTim.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as investigasi_insiden FROM investigasi_insiden_tim a  LEFT JOIN investigasi_insiden a1 ON a.investigasi_insiden_id = a1.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found InvestigasiInsidenTim with the id
        result({ kind: "not_found" }, null);
    });
};

InvestigasiInsidenTim.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as investigasi_insiden FROM investigasi_insiden_tim a  LEFT JOIN investigasi_insiden a1 ON a.investigasi_insiden_id = a1.id ";
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
		wheres += "a.nama LIKE '%" + param.q + "%' OR a.jabatan LIKE '%" + param.q + "%' OR a.tgl LIKE '%" + param.q + "%' OR a.status LIKE '%" + param.q + "%' OR a.investigasi_insiden_id LIKE '%" + param.q + "%'";	
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

InvestigasiInsidenTim.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'investigasi_insiden_tim'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

InvestigasiInsidenTim.updateById = async(id, investigasiinsidentim, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["nama", "jabatan", "tgl", "status", "investigasi_insiden_id"];
		for (var i in investigasiinsidentim) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (investigasiinsidentim[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(investigasiinsidentim[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE investigasi_insiden_tim SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...investigasiinsidentim });
	} catch (error) {
	    result(error, null);
	}
};

InvestigasiInsidenTim.remove = (id, result) => {
    sql.query("DELETE FROM investigasi_insiden_tim WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found InvestigasiInsidenTim with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = InvestigasiInsidenTim;

