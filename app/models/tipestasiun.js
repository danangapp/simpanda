const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const TipeStasiun = function (tipestasiun) {
    this.nama = tipestasiun.nama;
};

TipeStasiun.create = async(newTipeStasiun, result) => {
	try {

		const res = await query("INSERT INTO tipe_stasiun SET ?", newTipeStasiun);
		result(null, { id: res.insertId, ...newTipeStasiun });
	} catch (error) {
	    result(error, null);
	}
};

TipeStasiun.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_stasiun WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipeStasiun with the id
        result({ kind: "not_found" }, null);
    });
};

TipeStasiun.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM tipe_stasiun a";
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

TipeStasiun.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_stasiun'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

TipeStasiun.updateById = async(id, tipestasiun, result) => {
	try {


		var str = "", obj = [], no = 1;
		for (var i in tipestasiun) {
		    if (tipestasiun[i]) {
		        str += i + " = ?, ";
		        obj.push(tipestasiun[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE tipe_stasiun SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...tipestasiun });
	} catch (error) {
	    result(error, null);
	}
};

TipeStasiun.remove = (id, result) => {
    sql.query("DELETE FROM tipe_stasiun WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeStasiun with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = TipeStasiun;

