const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const StatusEvaluasiPelimpahan = function (statusevaluasipelimpahan) {
    this.nama = statusevaluasipelimpahan.nama;
};

StatusEvaluasiPelimpahan.create = async(newStatusEvaluasiPelimpahan, result) => {
	try {

		const res = await query("INSERT INTO status_evaluasi_pelimpahan SET ?", newStatusEvaluasiPelimpahan);
		result(null, { id: res.insertId, ...newStatusEvaluasiPelimpahan });
	} catch (error) {
	    result(error, null);
	}
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
    var query = "SELECT a.*  FROM status_evaluasi_pelimpahan a";
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

StatusEvaluasiPelimpahan.updateById = async(id, statusevaluasipelimpahan, result) => {
	try {


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

		await query("UPDATE status_evaluasi_pelimpahan SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...statusevaluasipelimpahan });
	} catch (error) {
	    result(error, null);
	}
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

