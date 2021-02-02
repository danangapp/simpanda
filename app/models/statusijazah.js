const sql = require("../config/db.js");

// constructor
const StatusIjazah = function (statusijazah) {
    this.nama = statusijazah.nama;
};

StatusIjazah.create = (newStatusIjazah, result) => {
    sql.query("INSERT INTO status_ijazah SET ?", newStatusIjazah, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created statusijazah: ", { id: res.insertId, ...newStatusIjazah });
        result(null, { id: res.insertId, ...newStatusIjazah });
    });
};

StatusIjazah.findById = (id, result) => {
    sql.query(`SELECT * FROM status_ijazah WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found statusijazah: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found StatusIjazah with the id
        result({ kind: "not_found" }, null);
    });
};

StatusIjazah.getAll = result => {
    sql.query("SELECT * FROM status_ijazah", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusijazah: ", res);
        result(null, res);
    });
};

StatusIjazah.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_ijazah'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusijazah: ", res);
        result(null, res);
    });
};

StatusIjazah.updateById = (id, statusijazah, result) => {
    sql.query(
        "UPDATE status_ijazah SET  nama = ? WHERE id = ?",
        [statusijazah.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StatusIjazah with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated statusijazah: ", { id: id, ...statusijazah });
            result(null, { id: id, ...statusijazah });
        }
    );
};

StatusIjazah.remove = (id, result) => {
    sql.query("DELETE FROM status_ijazah WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusIjazah with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted statusijazah with id: ", id);
        result(null, res);
    });
};

StatusIjazah.removeAll = result => {
    sql.query("DELETE FROM status_ijazah", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} statusijazah`);
        result(null, res);
    });
};

module.exports = StatusIjazah;

