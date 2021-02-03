const sql = require("../config/db.js");

// constructor
const Action = function (action) {
    this.nama = action.nama;
};

Action.create = (newAction, result) => {
    sql.query("INSERT INTO action SET ?", newAction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created action: ", { id: res.insertId, ...newAction });
        result(null, { id: res.insertId, ...newAction });
    });
};

Action.findById = (id, result) => {
    sql.query(`SELECT * FROM action WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found action: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Action with the id
        result({ kind: "not_found" }, null);
    });
};

Action.getAll = result => {
    sql.query("SELECT * FROM action", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("action: ", res);
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

        console.log("action: ", res);
        result(null, res);
    });
};

Action.updateById = (id, action, result) => {
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

    sql.query(
        "UPDATE action SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
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

            result(null, { id: id, ...action });
        }
    );
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

        console.log("deleted action with id: ", id);
        result(null, res);
    });
};

Action.removeAll = result => {
    sql.query("DELETE FROM action", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} action`);
        result(null, res);
    });
};

module.exports = Action;

