const sql = require("../config/db.js");

// constructor
const SaranaBantuPemanduPersonil = function (saranabantupemandupersonil) {
    this.sarana_bantu_pemandu_id = saranabantupemandupersonil.sarana_bantu_pemandu_id;
    this.nama = saranabantupemandupersonil.nama;
    this.jabatan = saranabantupemandupersonil.jabatan;
    this.asset_kapal_id = saranabantupemandupersonil.asset_kapal_id;
    this.status_ijazah_id = saranabantupemandupersonil.status_ijazah_id;
};

SaranaBantuPemanduPersonil.create = (newSaranaBantuPemanduPersonil, result) => {
    sql.query("INSERT INTO sarana_bantu_pemandu_personil SET ?", newSaranaBantuPemanduPersonil, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newSaranaBantuPemanduPersonil });
    });
};

SaranaBantuPemanduPersonil.findById = (id, result) => {
    sql.query(`SELECT * FROM sarana_bantu_pemandu_personil WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemanduPersonil with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemanduPersonil.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM sarana_bantu_pemandu_personil";
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

SaranaBantuPemanduPersonil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu_personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

SaranaBantuPemanduPersonil.updateById = (id, saranabantupemandupersonil, result) => {
	var str = "", obj = [], no = 1;
	for (var i in saranabantupemandupersonil) {
	    if (saranabantupemandupersonil[i]) {
	        str += i + " = ?, ";
	        obj.push(saranabantupemandupersonil[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE sarana_bantu_pemandu_personil SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SaranaBantuPemanduPersonil with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...saranabantupemandupersonil });
        }
    );
};

SaranaBantuPemanduPersonil.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu_personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemanduPersonil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = SaranaBantuPemanduPersonil;

