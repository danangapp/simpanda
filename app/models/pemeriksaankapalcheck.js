const sql = require("../config/db.js");

// constructor
const PemeriksaanKapalCheck = function (pemeriksaankapalcheck) {
    this.question = pemeriksaankapalcheck.question;
};

PemeriksaanKapalCheck.create = (newPemeriksaanKapalCheck, result) => {
    sql.query("INSERT INTO pemeriksaan_kapal_check SET ?", newPemeriksaanKapalCheck, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newPemeriksaanKapalCheck });
    });
};

PemeriksaanKapalCheck.findById = (id, result) => {
    sql.query(`SELECT * FROM pemeriksaan_kapal_check WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found PemeriksaanKapalCheck with the id
        result({ kind: "not_found" }, null);
    });
};

PemeriksaanKapalCheck.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM pemeriksaan_kapal_check";
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

PemeriksaanKapalCheck.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pemeriksaan_kapal_check'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

PemeriksaanKapalCheck.updateById = (id, pemeriksaankapalcheck, result) => {
	var str = "", obj = [], no = 1;
	for (var i in pemeriksaankapalcheck) {
	    if (pemeriksaankapalcheck[i]) {
	        str += i + " = ?, ";
	        obj.push(pemeriksaankapalcheck[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE pemeriksaan_kapal_check SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found PemeriksaanKapalCheck with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...pemeriksaankapalcheck });
        }
    );
};

PemeriksaanKapalCheck.remove = (id, result) => {
    sql.query("DELETE FROM pemeriksaan_kapal_check WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PemeriksaanKapalCheck with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = PemeriksaanKapalCheck;

