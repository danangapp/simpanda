const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const Role = function (role) {
    this.nama = role.nama;
};

Role.create = async(newRole, result) => {
	try {

		const res = await query("INSERT INTO role SET ?", newRole);
		result(null, { id: res.insertId, ...newRole });
	} catch (error) {
	    result(error, null);
	}
};

Role.findById = (id, result) => {
    sql.query(`SELECT * FROM role WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Role with the id
        result({ kind: "not_found" }, null);
    });
};

Role.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM role a";
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

Role.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'role'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Role.updateById = async(id, role, result) => {
	try {


		var str = "", obj = [], no = 1;
		for (var i in role) {
		    if (role[i]) {
		        str += i + " = ?, ";
		        obj.push(role[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE role SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...role });
	} catch (error) {
	    result(error, null);
	}
};

Role.remove = (id, result) => {
    sql.query("DELETE FROM role WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Role with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Role;

