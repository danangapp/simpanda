const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const User = function (user) {
    this.username = user.username;
    this.nama = user.nama;
    this.password = user.password;
    this.user_group_id = user.user_group_id;
    this.role_id = user.role_id;
};

User.create = async(newUser, result) => {
	try {


		const res = await query("INSERT INTO user SET ?", newUser);
		result(null, { id: res.insertId, ...newUser });
	} catch (error) {
	    result(error, null);
	}
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM user";
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

User.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'user'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.updateById = async(id, user, result) => {
	try {



		var str = "", obj = [], no = 1;
		for (var i in user) {
		    if (user[i]) {
		        str += i + " = ?, ";
		        obj.push(user[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE user SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
	} catch (error) {
	    result(error, null);
	}
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = User;

