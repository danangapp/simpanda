const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const Action = function (action) {
    this.nama = action.nama;
};

Action.create = async(newAction, result) => {
	try {


		const res = await query("INSERT INTO action SET ?", newAction);
		result(null, { id: res.insertId, ...newAction });
	} catch (error) {
	    result(error, null);
	}
};

Action.findById = (id, result) => {
    sql.query(`SELECT * FROM action WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Action with the id
        result({ kind: "not_found" }, null);
    });
};

Action.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM action";
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

Action.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'action'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Action.updateById = async(id, action, result) => {
	try {



		var str = "", obj = [], no = 1;
		for (var i in action) {
		    if (action[i]) {
		        str += i + " = ?, ";
		        obj.push(action[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE action SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...action });
	} catch (error) {
	    result(error, null);
	}
};

Action.remove = (id, result) => {
    sql.query("DELETE FROM action WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Action with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Action;

