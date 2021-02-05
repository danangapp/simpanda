const sql = require("../config/db.js");

// constructor
const TipeAsset = function (tipeasset) {
    this.nama = tipeasset.nama;
};

TipeAsset.create = (newTipeAsset, result) => {
    sql.query("INSERT INTO tipe_asset SET ?", newTipeAsset, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newTipeAsset });
    });
};

TipeAsset.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_asset WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipeAsset with the id
        result({ kind: "not_found" }, null);
    });
};

TipeAsset.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM tipe_asset";
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

TipeAsset.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_asset'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

TipeAsset.updateById = (id, tipeasset, result) => {
	var str = "", obj = [], no = 1;
	for (var i in tipeasset) {
	    if (tipeasset[i]) {
	        str += i + " = ?, ";
	        obj.push(tipeasset[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE tipe_asset SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TipeAsset with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...tipeasset });
        }
    );
};

TipeAsset.remove = (id, result) => {
    sql.query("DELETE FROM tipe_asset WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeAsset with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = TipeAsset;

