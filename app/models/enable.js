const sql = require("../config/db.js");

// constructor
const Enable = function (enable) {
    this.nama = enable.nama;
};

Enable.create = (newEnable, result) => {
    sql.query("INSERT INTO enable SET ?", newEnable, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created enable: ", { id: res.insertId, ...newEnable });
        result(null, { id: res.insertId, ...newEnable });
    });
};

Enable.findById = (id, result) => {
    sql.query(`SELECT * FROM enable WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found enable: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Enable with the id
        result({ kind: "not_found" }, null);
    });
};

Enable.getAll = result => {
    sql.query("SELECT * FROM enable", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("enable: ", res);
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

        console.log("enable: ", res);
        result(null, res);
    });
};

Enable.updateById = (id, enable, result) => {
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

    sql.query(
        "UPDATE enable SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
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

            result(null, { id: id, ...enable });
        }
    );
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

        console.log("deleted enable with id: ", id);
        result(null, res);
    });
};

Enable.removeAll = result => {
    sql.query("DELETE FROM enable", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} enable`);
        result(null, res);
    });
};

module.exports = Enable;

