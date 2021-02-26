const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const PanduJaga = function (pandujaga) {
    this.pandu_schedule_id = pandujaga.pandu_schedule_id;
    this.personil_id = pandujaga.personil_id;
};

PanduJaga.create = async(newPanduJaga, result) => {
	try {
		const pandu_schedule = newPanduJaga.pandu_schedule;
		delete newPanduJaga.pandu_schedule;
		const res = await query("INSERT INTO pandu_jaga SET ?", newPanduJaga);
		for (var i in pandu_schedule) {
		    const x = pandu_schedule[i];
			x['pandu_jaga_id'] = res.insertId;
		
		    var header = "", value = "";
		    for (var a in x) {
		        var val = x[a];
		        if (a == "date") val = f.toDate(val);
		        header += a + ", ";
				value += "'" + val + "', ";
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
			await query("INSERT INTO pandu_schedule (" + header + ") values (" + value + ")");
		}

		result(null, { id: res.insertId, ...newPanduJaga });
	} catch (error) {
	    result(error, null);
	}
};

PanduJaga.findById = async (id, result) => {
	const resQuery = await query("SELECT * FROM pandu_schedule WHERE pandu_jaga_id = '" + id + "'");
    sql.query(`SELECT a.* , a1.keterangan as pandu_schedule, a2.nama as personil FROM pandu_jaga a  LEFT JOIN pandu_schedule a1 ON a.pandu_schedule_id = a1.id  LEFT JOIN personil a2 ON a.personil_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

		const pandu_schedule = { "pandu_schedule": resQuery }
		let merge = { ...res[0], ...pandu_schedule }	
        if (res.length) {
            result(null, merge);
            return;
        }

        // not found PanduJaga with the id
        result({ kind: "not_found" }, null);
    });
};

PanduJaga.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.keterangan as pandu_schedule, a2.nama as personil FROM pandu_jaga a  LEFT JOIN pandu_schedule a1 ON a.pandu_schedule_id = a1.id  LEFT JOIN personil a2 ON a.personil_id = a2.id ";
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
		wheres += "a.pandu_schedule_id LIKE '%" + param.q + "%' OR a.personil_id LIKE '%" + param.q + "%'";	
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

PanduJaga.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pandu_jaga'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

PanduJaga.updateById = async(id, pandujaga, result) => {
	try {
		const pandu_schedule = pandujaga.pandu_schedule;
		var arr = ["date", "cabang_id", "status_absen", "keterangan", "approval_status_id", "enable"]
		await query("DELETE FROM pandu_schedule WHERE pandu_jaga_id='" + id + "'");
		for (var i in pandu_schedule) {
		    const x = pandu_schedule[i];
		
		    var header = "", value = "";
			x['pandu_jaga_id'] = id;
		    for (var a in x) {
		        var val = x[a];
				var adadiTable = 0
				for (var b in arr) {
					if (a == arr[b]) {
						adadiTable = 1;
						break;
					}
				}

				if (adadiTable == 1) {
					if (val) {
						header += a + ", ";
						value += "'" + val + "', ";
					}
				}
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
		
			await query("INSERT INTO pandu_schedule (" + header + ") values (" + value + ")");
		}
		delete pandujaga.pandu_schedule;

		var str = "", obj = [], no = 1;
		var arr = ["pandu_schedule_id", "personil_id"];
		for (var i in pandujaga) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (pandujaga[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(pandujaga[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE pandu_jaga SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...pandujaga });
	} catch (error) {
	    result(error, null);
	}
};

PanduJaga.remove = (id, result) => {
    sql.query("DELETE FROM pandu_jaga WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PanduJaga with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = PanduJaga;

