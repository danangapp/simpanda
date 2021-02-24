const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const PanduSchedule = function (panduschedule) {
    this.date = panduschedule.date;
    this.cabang_id = panduschedule.cabang_id;
    this.status_absen = panduschedule.status_absen;
    this.keterangan = panduschedule.keterangan;
    this.approval_status_id = panduschedule.approval_status_id;
    this.enable = panduschedule.enable;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'panduschedule';
		objek.action = objects.approval_status_id;
		objek.user_id = objects.user_id;
		objek.remark = objects.remark;
		objek.koneksi = koneksi;
		delete objects.date;
		delete objects.item;
		delete objects.action;
		delete objects.user_id;
		delete objects.remark;
		delete objects.koneksi;
		return objects
};

PanduSchedule.create = async(newPanduSchedule, result) => {
	try {
		const pandu_jaga = newPanduSchedule.pandu_jaga;
		delete newPanduSchedule.pandu_jaga;
		newPanduSchedule = setActivity(newPanduSchedule);
		const res = await query("INSERT INTO pandu_schedule SET ?", newPanduSchedule);
		for (var i in pandu_jaga) {
		    const x = pandu_jaga[i];
			x['pandu_schedule_id'] = res.insertId;
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
				value += "'" + val + "', ";
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
			await query("INSERT INTO pandu_jaga (" + header + ") values (" + value + ")");
		}

		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newPanduSchedule });
	} catch (error) {
	    result(error, null);
	}
};

PanduSchedule.findById = async (id, result) => {
	const resQuery = await query("SELECT * FROM pandu_jaga WHERE pandu_schedule_id = '" + id + "'");
	const resActivityLog = await query("SELECT a.date, a.item, a.action, a.user_id, a.remark, a.koneksi FROM activity_log a INNER JOIN pandu_schedule b ON a.item = 'pandu_schedule' AND a.koneksi = b.id WHERE b.id =  '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as cabang, a2.nama as approval_status, a3.nama as ena FROM pandu_schedule a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

		const pandu_jaga = { "pandu_jaga": resQuery }
		const activityLog = { "activityLog": resActivityLog }
		let merge = { ...res[0], ...pandu_jaga, ...activityLog }	
        if (res.length) {
            result(null, merge);
            return;
        }

        // not found PanduSchedule with the id
        result({ kind: "not_found" }, null);
    });
};

PanduSchedule.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as cabang, a2.nama as approval_status, a3.nama as ena FROM pandu_schedule a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id ";
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
		wheres += "a.date LIKE '%" + param.q + "%' OR a.cabang_id LIKE '%" + param.q + "%' OR a.status_absen LIKE '%" + param.q + "%' OR a.keterangan LIKE '%" + param.q + "%' OR a.approval_status_id LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%'";	
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

PanduSchedule.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pandu_schedule'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

PanduSchedule.updateById = async(id, panduschedule, result) => {
	try {
		const pandu_jaga = panduschedule.pandu_jaga;
		var arr = ["pandu_schedule_id", "personil_id"]
		await query("DELETE FROM pandu_jaga WHERE pandu_schedule_id='" + id + "'");
		for (var i in pandu_jaga) {
		    const x = pandu_jaga[i];
		
		    var header = "", value = "";
			x['pandu_schedule_id'] = id;
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
		
			await query("INSERT INTO pandu_jaga (" + header + ") values (" + value + ")");
		}
		delete panduschedule.pandu_jaga;
		panduschedule = await setActivity(panduschedule, id);

		var str = "", obj = [], no = 1;
		var arr = ["date", "cabang_id", "status_absen", "keterangan", "approval_status_id", "enable"];
		for (var i in panduschedule) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (panduschedule[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(panduschedule[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE pandu_schedule SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...panduschedule });
	} catch (error) {
	    result(error, null);
	}
};

PanduSchedule.remove = (id, result) => {
    sql.query("DELETE FROM pandu_schedule WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PanduSchedule with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = PanduSchedule;

