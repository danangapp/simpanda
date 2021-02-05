const sql = require("../config/db.js");

// constructor
const SaranaBantuPemandu = function (saranabantupemandu) {
    this.approval_status_id = saranabantupemandu.approval_status_id;
    this.cabang_id = saranabantupemandu.cabang_id;
    this.tanggal_pemeriksaan = saranabantupemandu.tanggal_pemeriksaan;
    this.pelaksana = saranabantupemandu.pelaksana;
};

SaranaBantuPemandu.create = (newSaranaBantuPemandu, result) => {
    sql.query("INSERT INTO sarana_bantu_pemandu SET ?", newSaranaBantuPemandu, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newSaranaBantuPemandu });
    });
};

SaranaBantuPemandu.findById = (id, result) => {
    sql.query(`SELECT * FROM sarana_bantu_pemandu WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemandu with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemandu.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM sarana_bantu_pemandu";
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

SaranaBantuPemandu.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

SaranaBantuPemandu.updateById = (id, saranabantupemandu, result) => {
	var str = "", obj = [], no = 1;
	for (var i in saranabantupemandu) {
	    if (saranabantupemandu[i]) {
	        str += i + " = ?, ";
	        obj.push(saranabantupemandu[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE sarana_bantu_pemandu SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SaranaBantuPemandu with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...saranabantupemandu });
        }
    );
};

SaranaBantuPemandu.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemandu with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = SaranaBantuPemandu;

