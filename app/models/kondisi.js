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

        console.log("created kondisi: ", { id: res.insertId, ...newKondisi });
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
            console.log("found kondisi: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Kondisi with the id
        result({ kind: "not_found" }, null);
    });
};

Kondisi.getAll = result => {
    sql.query("SELECT * FROM kondisi", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("kondisi: ", res);
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

        console.log("kondisi: ", res);
        result(null, res);
    });
};

Kondisi.updateById = (id, kondisi, result) => {
    sql.query(
        "UPDATE kondisi SET  nama = ? WHERE id = ?",
        [kondisi.nama, id],
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

            console.log("updated kondisi: ", { id: id, ...kondisi });
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

        console.log("deleted kondisi with id: ", id);
        result(null, res);
    });
};

Kondisi.removeAll = result => {
    sql.query("DELETE FROM kondisi", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} kondisi`);
        result(null, res);
    });
};

module.exports = Kondisi;

