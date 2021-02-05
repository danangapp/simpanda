const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const TipePersonil = function (tipepersonil) {
    this.nama = tipepersonil.nama;
};

TipePersonil.create = async(newTipePersonil, result) => {
	try {

		const res = await query("INSERT INTO tipe_personil SET ?", newTipePersonil);
		result(null, { id: res.insertId, ...newTipePersonil });
	} catch (error) {
	    result(error, null);
	}
};

TipePersonil.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_personil WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipePersonil with the id
        result({ kind: "not_found" }, null);
    });
};

TipePersonil.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM tipe_personil";
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

TipePersonil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

TipePersonil.updateById = async(id, tipepersonil, result) => {
	try {


		var str = "", obj = [], no = 1;
		for (var i in tipepersonil) {
		    if (tipepersonil[i]) {
		        str += i + " = ?, ";
		        obj.push(tipepersonil[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE tipe_personil SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...tipe_personil });
	} catch (error) {
	    result(error, null);
	}
};

TipePersonil.remove = (id, result) => {
    sql.query("DELETE FROM tipe_personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipePersonil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = TipePersonil;

