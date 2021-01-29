const sql = require("../config/db.js");

// constructor
const MstTipeAsset = function (msttipeasset) {
    this.nama = msttipeasset.nama;
};

MstTipeAsset.create = (newMstTipeAsset, result) => {
    sql.query("INSERT INTO mst_tipe_asset SET ?", newMstTipeAsset, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created msttipeasset: ", { id: res.insertId, ...newMstTipeAsset });
        result(null, { id: res.insertId, ...newMstTipeAsset });
    });
};

MstTipeAsset.findById = (id, result) => {
    sql.query(`SELECT * FROM mst_tipe_asset WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found msttipeasset: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found MstTipeAsset with the id
        result({ kind: "not_found" }, null);
    });
};

MstTipeAsset.getAll = result => {
    sql.query("SELECT * FROM mst_tipe_asset", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("msttipeasset: ", res);
        result(null, res);
    });
};

MstTipeAsset.updateById = (id, msttipeasset, result) => {
    sql.query(
        "UPDATE mst_tipe_asset SET  nama = ? WHERE id = ?",
        [msttipeasset.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MstTipeAsset with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated msttipeasset: ", { id: id, ...msttipeasset });
            result(null, { id: id, ...msttipeasset });
        }
    );
};

MstTipeAsset.remove = (id, result) => {
    sql.query("DELETE FROM mst_tipe_asset WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MstTipeAsset with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted msttipeasset with id: ", id);
        result(null, res);
    });
};

MstTipeAsset.removeAll = result => {
    sql.query("DELETE FROM mst_tipe_asset", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} msttipeasset`);
        result(null, res);
    });
};

module.exports = MstTipeAsset;

