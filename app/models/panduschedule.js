const sql = require("../config/db.js");

// constructor
const PanduSchedule = function (panduschedule) {
    this.date = panduschedule.date;
    this.cabang_id = panduschedule.cabang_id;
    this.pandu_jaga_id = panduschedule.pandu_jaga_id;
    this.pandu_jaga_nama = panduschedule.pandu_jaga_nama;
    this.status_absen = panduschedule.status_absen;
    this.keterangan = panduschedule.keterangan;
};

PanduSchedule.create = (newPanduSchedule, result) => {
    sql.query("INSERT INTO pandu_schedule SET ?", newPanduSchedule, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newPanduSchedule });
    });
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
    var query = "SELECT * FROM pandu_schedule";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += i + " ='" + param[i] + "' and ";
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

PanduSchedule.updateById = (id, panduschedule, result) => {
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

    sql.query(
        "UPDATE pandu_schedule SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
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

            result(null, { id: id, ...panduschedule });
        }
    );
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

