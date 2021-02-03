const sql = require("../config/db.js");

// constructor
const DokumenKapal = function (dokumenkapal) {
    this.nama = dokumenkapal.nama;
};

DokumenKapal.create = (newDokumenKapal, result) => {
    sql.query("INSERT INTO dokumen_kapal SET ?", newDokumenKapal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created dokumenkapal: ", { id: res.insertId, ...newDokumenKapal });
        result(null, { id: res.insertId, ...newDokumenKapal });
    });
};

DokumenKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM dokumen_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found dokumenkapal: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found DokumenKapal with the id
        result({ kind: "not_found" }, null);
    });
};

DokumenKapal.getAll = result => {
    sql.query("SELECT * FROM dokumen_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("dokumenkapal: ", res);
        result(null, res);
    });
};

DokumenKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'dokumen_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("dokumenkapal: ", res);
        result(null, res);
    });
};

DokumenKapal.updateById = (id, dokumenkapal, result) => {
	var str = "", obj = [], no = 1;
	for (var i in dokumenkapal) {
	    if (dokumenkapal[i]) {
	        str += i + " = ?, ";
	        obj.push(dokumenkapal[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE dokumen_kapal SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found DokumenKapal with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...dokumenkapal });
        }
    );
};

DokumenKapal.remove = (id, result) => {
    sql.query("DELETE FROM dokumen_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found DokumenKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted dokumenkapal with id: ", id);
        result(null, res);
    });
};

DokumenKapal.removeAll = result => {
    sql.query("DELETE FROM dokumen_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} dokumenkapal`);
        result(null, res);
    });
};

module.exports = DokumenKapal;

