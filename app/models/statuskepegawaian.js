const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const StatusKepegawaian = function (statuskepegawaian) {
    this.nama = statuskepegawaian.nama;
};

StatusKepegawaian.create = async(newStatusKepegawaian, result) => {
	try {
		const res = await query("INSERT INTO status_kepegawaian SET ?", newStatusKepegawaian);
		result(null, { id: res.insertId, ...newStatusKepegawaian });
	} catch (error) {
	    result(error, null);
	}
};

StatusKepegawaian.findById = (id, result) => {
    sql.query(`SELECT * FROM status_kepegawaian WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found StatusKepegawaian with the id
        result({ kind: "not_found" }, null);
    });
};

StatusKepegawaian.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM status_kepegawaian";
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

StatusKepegawaian.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_kepegawaian'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

StatusKepegawaian.updateById = async(id, statuskepegawaian, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in statuskepegawaian) {
		    if (statuskepegawaian[i]) {
		        str += i + " = ?, ";
		        obj.push(statuskepegawaian[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE status_kepegawaian SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
	} catch (error) {
	    result(error, null);
	}
};

StatusKepegawaian.remove = (id, result) => {
    sql.query("DELETE FROM status_kepegawaian WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusKepegawaian with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = StatusKepegawaian;

