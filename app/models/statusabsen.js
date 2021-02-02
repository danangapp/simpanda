const sql = require("../config/db.js");

// constructor
const StatusAbsen = function (statusabsen) {
    this.nama = statusabsen.nama;
};

StatusAbsen.create = (newStatusAbsen, result) => {
    sql.query("INSERT INTO status_absen SET ?", newStatusAbsen, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created statusabsen: ", { id: res.insertId, ...newStatusAbsen });
        result(null, { id: res.insertId, ...newStatusAbsen });
    });
};

StatusAbsen.findById = (id, result) => {
    sql.query(`SELECT * FROM status_absen WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found statusabsen: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found StatusAbsen with the id
        result({ kind: "not_found" }, null);
    });
};

StatusAbsen.getAll = result => {
    sql.query("SELECT * FROM status_absen", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusabsen: ", res);
        result(null, res);
    });
};

StatusAbsen.updateById = (id, statusabsen, result) => {
    sql.query(
        "UPDATE status_absen SET  nama = ? WHERE id = ?",
        [statusabsen.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StatusAbsen with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated statusabsen: ", { id: id, ...statusabsen });
            result(null, { id: id, ...statusabsen });
        }
    );
};

StatusAbsen.remove = (id, result) => {
    sql.query("DELETE FROM status_absen WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusAbsen with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted statusabsen with id: ", id);
        result(null, res);
    });
};

StatusAbsen.removeAll = result => {
    sql.query("DELETE FROM status_absen", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} statusabsen`);
        result(null, res);
    });
};

module.exports = StatusAbsen;

