const sql = require("../config/db.js");

// constructor
const Cabang = function (cabang) {
    this.nama = cabang.nama;
};

Cabang.create = (newCabang, result) => {
    sql.query("INSERT INTO cabang SET ?", newCabang, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created cabang: ", { id: res.insertId, ...newCabang });
        result(null, { id: res.insertId, ...newCabang });
    });
};

Cabang.findById = (id, result) => {
    sql.query(`SELECT * FROM cabang WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found cabang: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Cabang with the id
        result({ kind: "not_found" }, null);
    });
};

Cabang.getAll = result => {
    sql.query("SELECT * FROM cabang", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cabang: ", res);
        result(null, res);
    });
};

Cabang.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'cabang'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cabang: ", res);
        result(null, res);
    });
};

Cabang.updateById = (id, cabang, result) => {
    sql.query(
        "UPDATE cabang SET  nama = ? WHERE id = ?",
        [cabang.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Cabang with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated cabang: ", { id: id, ...cabang });
            result(null, { id: id, ...cabang });
        }
    );
};

Cabang.remove = (id, result) => {
    sql.query("DELETE FROM cabang WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Cabang with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted cabang with id: ", id);
        result(null, res);
    });
};

Cabang.removeAll = result => {
    sql.query("DELETE FROM cabang", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} cabang`);
        result(null, res);
    });
};

module.exports = Cabang;

