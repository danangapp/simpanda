const sql = require("../config/db.js");

// constructor
const StatusEvaluasiPelimpahan = function (statusevaluasipelimpahan) {
    this.nama = statusevaluasipelimpahan.nama;
};

StatusEvaluasiPelimpahan.create = (newStatusEvaluasiPelimpahan, result) => {
    sql.query("INSERT INTO status_evaluasi_pelimpahan SET ?", newStatusEvaluasiPelimpahan, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newStatusEvaluasiPelimpahan });
    });
};

StatusEvaluasiPelimpahan.findById = (id, result) => {
    sql.query(`SELECT * FROM status_evaluasi_pelimpahan WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found StatusEvaluasiPelimpahan with the id
        result({ kind: "not_found" }, null);
    });
};

StatusEvaluasiPelimpahan.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM status_evaluasi_pelimpahan";
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

StatusEvaluasiPelimpahan.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_evaluasi_pelimpahan'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

StatusEvaluasiPelimpahan.updateById = (id, statusevaluasipelimpahan, result) => {
	var str = "", obj = [], no = 1;
	for (var i in statusevaluasipelimpahan) {
	    if (statusevaluasipelimpahan[i]) {
	        str += i + " = ?, ";
	        obj.push(statusevaluasipelimpahan[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE status_evaluasi_pelimpahan SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StatusEvaluasiPelimpahan with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...statusevaluasipelimpahan });
        }
    );
};

StatusEvaluasiPelimpahan.remove = (id, result) => {
    sql.query("DELETE FROM status_evaluasi_pelimpahan WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusEvaluasiPelimpahan with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = StatusEvaluasiPelimpahan;

