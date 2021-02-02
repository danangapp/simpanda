const sql = require("../config/db.js");

// constructor
const StatusKepegawaian = function (statuskepegawaian) {
    this.nama = statuskepegawaian.nama;
};

StatusKepegawaian.create = (newStatusKepegawaian, result) => {
    sql.query("INSERT INTO status_kepegawaian SET ?", newStatusKepegawaian, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created statuskepegawaian: ", { id: res.insertId, ...newStatusKepegawaian });
        result(null, { id: res.insertId, ...newStatusKepegawaian });
    });
};

StatusKepegawaian.findById = (id, result) => {
    sql.query(`SELECT * FROM status_kepegawaian WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found statuskepegawaian: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found StatusKepegawaian with the id
        result({ kind: "not_found" }, null);
    });
};

StatusKepegawaian.getAll = result => {
    sql.query("SELECT * FROM status_kepegawaian", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statuskepegawaian: ", res);
        result(null, res);
    });
};

StatusKepegawaian.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_kepegawaian'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statuskepegawaian: ", res);
        result(null, res);
    });
};

StatusKepegawaian.updateById = (id, statuskepegawaian, result) => {
    sql.query(
        "UPDATE status_kepegawaian SET  nama = ? WHERE id = ?",
        [statuskepegawaian.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StatusKepegawaian with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated statuskepegawaian: ", { id: id, ...statuskepegawaian });
            result(null, { id: id, ...statuskepegawaian });
        }
    );
};

StatusKepegawaian.remove = (id, result) => {
    sql.query("DELETE FROM status_kepegawaian WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusKepegawaian with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted statuskepegawaian with id: ", id);
        result(null, res);
    });
};

StatusKepegawaian.removeAll = result => {
    sql.query("DELETE FROM status_kepegawaian", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} statuskepegawaian`);
        result(null, res);
    });
};

module.exports = StatusKepegawaian;

