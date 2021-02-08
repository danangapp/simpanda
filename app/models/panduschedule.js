const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const PanduSchedule = function (panduschedule) {
    this.date = panduschedule.date;
    this.cabang_id = panduschedule.cabang_id;
    this.pandu_jaga_id = panduschedule.pandu_jaga_id;
    this.pandu_jaga_nama = panduschedule.pandu_jaga_nama;
    this.status_absen = panduschedule.status_absen;
    this.keterangan = panduschedule.keterangan;
    this.approval_status_id = panduschedule.approval_status_id;
    this.enable = panduschedule.enable;
};

PanduSchedule.create = async(newPanduSchedule, result) => {
	try {
		var obj = new Object();
		obj.date = newPanduSchedule.date;
		obj.item = newPanduSchedule.item;
		obj.action = newPanduSchedule.action;
		obj.user_id = newPanduSchedule.user_id;
		obj.remark = newPanduSchedule.remark;
		obj.koneksi = newPanduSchedule.koneksi;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newPanduSchedule.date;
		delete newPanduSchedule.item;
		delete newPanduSchedule.action;
		delete newPanduSchedule.user_id;
		delete newPanduSchedule.remark;
		delete newPanduSchedule.koneksi;

		const res = await query("INSERT INTO pandu_schedule SET ?", newPanduSchedule);
		result(null, { id: res.insertId, ...newPanduSchedule });
	} catch (error) {
	    result(error, null);
	}
};

PanduSchedule.findById = (id, result) => {
    sql.query(`SELECT * FROM pandu_schedule WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found PanduSchedule with the id
        result({ kind: "not_found" }, null);
    });
};

PanduSchedule.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as cabang, a2.nama as approval_status, a3.nama as ena FROM pandu_schedule a LEFT JOIN cabang a1 ON a.cabang_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id ";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += "a." + i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += "a." + i + " ='" + param[i] + "' and ";
            }
        }

        query = query.substring(0, query.length - 5);
    }
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
		var obj = new Object();
		obj.date = PanduSchedule.date;
		obj.item = PanduSchedule.item;
		obj.action = PanduSchedule.action;
		obj.user_id = PanduSchedule.user_id;
		obj.remark = PanduSchedule.remark;
		obj.koneksi = PanduSchedule.koneksi;
		await query("INSERT INTO activity_log SET ?", obj);
		delete PanduSchedule.date;
		delete PanduSchedule.item;
		delete PanduSchedule.action;
		delete PanduSchedule.user_id;
		delete PanduSchedule.remark;
		delete PanduSchedule.koneksi;


		var str = "", obj = [], no = 1;
		for (var i in panduschedule) {
		    if (panduschedule[i]) {
		        str += i + " = ?, ";
		        obj.push(panduschedule[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

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

