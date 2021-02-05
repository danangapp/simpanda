const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const Enable = function (enable) {
    this.nama = enable.nama;
};

Enable.create = async(newEnable, result) => {
	try {

		const res = await query("INSERT INTO enable SET ?", newEnable);
		result(null, { id: res.insertId, ...newEnable });
	} catch (error) {
	    result(error, null);
	}
};

Enable.findById = (id, result) => {
    sql.query(`SELECT * FROM enable WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Enable with the id
        result({ kind: "not_found" }, null);
    });
};

Enable.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM enable";
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

Enable.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'enable'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Enable.updateById = async(id, enable, result) => {
	try {


		var str = "", obj = [], no = 1;
		for (var i in enable) {
		    if (enable[i]) {
		        str += i + " = ?, ";
		        obj.push(enable[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE enable SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...enable });
	} catch (error) {
	    result(error, null);
	}
};

Enable.remove = (id, result) => {
    sql.query("DELETE FROM enable WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Enable with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Enable;

