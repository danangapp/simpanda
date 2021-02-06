const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const KondisiUmum = function (kondisiumum) {
    this.nama = kondisiumum.nama;
};

KondisiUmum.create = async(newKondisiUmum, result) => {
	try {

		const res = await query("INSERT INTO kondisi_umum SET ?", newKondisiUmum);
		result(null, { id: res.insertId, ...newKondisiUmum });
	} catch (error) {
	    result(error, null);
	}
};

KondisiUmum.findById = (id, result) => {
    sql.query(`SELECT * FROM kondisi_umum WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found KondisiUmum with the id
        result({ kind: "not_found" }, null);
    });
};

KondisiUmum.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM kondisi_umum a";
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

KondisiUmum.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'kondisi_umum'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

KondisiUmum.updateById = async(id, kondisiumum, result) => {
	try {


		var str = "", obj = [], no = 1;
		for (var i in kondisiumum) {
		    if (kondisiumum[i]) {
		        str += i + " = ?, ";
		        obj.push(kondisiumum[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE kondisi_umum SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...kondisiumum });
	} catch (error) {
	    result(error, null);
	}
};

KondisiUmum.remove = (id, result) => {
    sql.query("DELETE FROM kondisi_umum WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found KondisiUmum with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = KondisiUmum;

