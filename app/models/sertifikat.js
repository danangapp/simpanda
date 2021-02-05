const sql = require("../config/db.js");

// constructor
const Sertifikat = function (sertifikat) {
    this.tipe_cert_id = sertifikat.tipe_cert_id;
    this.personil_id = sertifikat.personil_id;
    this.no_sertifikat = sertifikat.no_sertifikat;
    this.issuer = sertifikat.issuer;
    this.tempat_keluar_sertifikat = sertifikat.tempat_keluar_sertifikat;
    this.tanggal_keluar_sertifikat = sertifikat.tanggal_keluar_sertifikat;
    this.tanggal_expire = sertifikat.tanggal_expire;
    this.reminder_date = sertifikat.reminder_date;
    this.sertifikat = sertifikat.sertifikat;
    this.sertifikat_id = sertifikat.sertifikat_id;
};

Sertifikat.create = (newSertifikat, result) => {
    sql.query("INSERT INTO sertifikat SET ?", newSertifikat, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newSertifikat });
    });
};

Sertifikat.findById = (id, result) => {
    sql.query(`SELECT * FROM sertifikat WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Sertifikat with the id
        result({ kind: "not_found" }, null);
    });
};

Sertifikat.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM sertifikat";
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

Sertifikat.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sertifikat'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Sertifikat.updateById = (id, sertifikat, result) => {
	var str = "", obj = [], no = 1;
	for (var i in sertifikat) {
	    if (sertifikat[i]) {
	        str += i + " = ?, ";
	        obj.push(sertifikat[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE sertifikat SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Sertifikat with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...sertifikat });
        }
    );
};

Sertifikat.remove = (id, result) => {
    sql.query("DELETE FROM sertifikat WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Sertifikat with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Sertifikat;

