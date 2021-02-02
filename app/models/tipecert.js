const sql = require("../config/db.js");

// constructor
const TipeCert = function (tipecert) {
    this.nama = tipecert.nama;
    this.remark = tipecert.remark;
};

TipeCert.create = (newTipeCert, result) => {
    sql.query("INSERT INTO tipe_cert SET ?", newTipeCert, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tipecert: ", { id: res.insertId, ...newTipeCert });
        result(null, { id: res.insertId, ...newTipeCert });
    });
};

TipeCert.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_cert WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tipecert: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TipeCert with the id
        result({ kind: "not_found" }, null);
    });
};

TipeCert.getAll = result => {
    sql.query("SELECT * FROM tipe_cert", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipecert: ", res);
        result(null, res);
    });
};

TipeCert.updateById = (id, tipecert, result) => {
    sql.query(
        "UPDATE tipe_cert SET  nama = ?, remark = ? WHERE id = ?",
        [tipecert.nama, tipecert.remark, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TipeCert with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tipecert: ", { id: id, ...tipecert });
            result(null, { id: id, ...tipecert });
        }
    );
};

TipeCert.remove = (id, result) => {
    sql.query("DELETE FROM tipe_cert WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeCert with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tipecert with id: ", id);
        result(null, res);
    });
};

TipeCert.removeAll = result => {
    sql.query("DELETE FROM tipe_cert", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tipecert`);
        result(null, res);
    });
};

module.exports = TipeCert;

