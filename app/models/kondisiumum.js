const sql = require("../config/db.js");

// constructor
const KondisiUmum = function (kondisiumum) {
    this.nama = kondisiumum.nama;
};

KondisiUmum.create = (newKondisiUmum, result) => {
    sql.query("INSERT INTO kondisi_umum SET ?", newKondisiUmum, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created kondisiumum: ", { id: res.insertId, ...newKondisiUmum });
        result(null, { id: res.insertId, ...newKondisiUmum });
    });
};

KondisiUmum.findById = (id, result) => {
    sql.query(`SELECT * FROM kondisi_umum WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found kondisiumum: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found KondisiUmum with the id
        result({ kind: "not_found" }, null);
    });
};

KondisiUmum.getAll = result => {
    sql.query("SELECT * FROM kondisi_umum", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("kondisiumum: ", res);
        result(null, res);
    });
};

KondisiUmum.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'kondisi_umum'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("kondisiumum: ", res);
        result(null, res);
    });
};

KondisiUmum.updateById = (id, kondisiumum, result) => {
    sql.query(
        "UPDATE kondisi_umum SET  nama = ? WHERE id = ?",
        [kondisiumum.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found KondisiUmum with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated kondisiumum: ", { id: id, ...kondisiumum });
            result(null, { id: id, ...kondisiumum });
        }
    );
};

KondisiUmum.remove = (id, result) => {
    sql.query("DELETE FROM kondisi_umum WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found KondisiUmum with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted kondisiumum with id: ", id);
        result(null, res);
    });
};

KondisiUmum.removeAll = result => {
    sql.query("DELETE FROM kondisi_umum", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} kondisiumum`);
        result(null, res);
    });
};

module.exports = KondisiUmum;

