const sql = require("../config/db.js");

// constructor
const TipeAsset = function (tipeasset) {
    this.nama = tipeasset.nama;
};

TipeAsset.create = (newTipeAsset, result) => {
    sql.query("INSERT INTO tipe_asset SET ?", newTipeAsset, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tipeasset: ", { id: res.insertId, ...newTipeAsset });
        result(null, { id: res.insertId, ...newTipeAsset });
    });
};

TipeAsset.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_asset WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tipeasset: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TipeAsset with the id
        result({ kind: "not_found" }, null);
    });
};

TipeAsset.getAll = result => {
    sql.query("SELECT * FROM tipe_asset", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipeasset: ", res);
        result(null, res);
    });
};

TipeAsset.updateById = (id, tipeasset, result) => {
    sql.query(
        "UPDATE tipe_asset SET  nama = ? WHERE id = ?",
        [tipeasset.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TipeAsset with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tipeasset: ", { id: id, ...tipeasset });
            result(null, { id: id, ...tipeasset });
        }
    );
};

TipeAsset.remove = (id, result) => {
    sql.query("DELETE FROM tipe_asset WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeAsset with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tipeasset with id: ", id);
        result(null, res);
    });
};

TipeAsset.removeAll = result => {
    sql.query("DELETE FROM tipe_asset", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tipeasset`);
        result(null, res);
    });
};

module.exports = TipeAsset;

