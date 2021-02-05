const sql = require("../config/db.js");

// constructor
const Kondisi = function (kondisi) {
    this.nama = kondisi.nama;
};

Kondisi.create = (newKondisi, result) => {
    sql.query("INSERT INTO kondisi SET ?", newKondisi, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newKondisi });
    });
};

Kondisi.findById = (id, result) => {
    sql.query(`SELECT * FROM kondisi WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Kondisi with the id
        result({ kind: "not_found" }, null);
    });
};

Kondisi.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM kondisi";
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

Kondisi.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'kondisi'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Kondisi.updateById = (id, kondisi, result) => {
	var str = "", obj = [], no = 1;
	for (var i in kondisi) {
	    if (kondisi[i]) {
	        str += i + " = ?, ";
	        obj.push(kondisi[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE kondisi SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Kondisi with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...kondisi });
        }
    );
};

Kondisi.remove = (id, result) => {
    sql.query("DELETE FROM kondisi WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Kondisi with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Kondisi;

