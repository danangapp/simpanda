const sql = require("../config/db.js");

// constructor
const MstTipePersonil = function (msttipepersonil) {
    this.nama = msttipepersonil.nama;
};

MstTipePersonil.create = (newMstTipePersonil, result) => {
    sql.query("INSERT INTO mst_tipe_personil SET ?", newMstTipePersonil, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created msttipepersonil: ", { id: res.insertId, ...newMstTipePersonil });
        result(null, { id: res.insertId, ...newMstTipePersonil });
    });
};

MstTipePersonil.findById = (id, result) => {
    sql.query(`SELECT * FROM mst_tipe_personil WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found msttipepersonil: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found MstTipePersonil with the id
        result({ kind: "not_found" }, null);
    });
};

MstTipePersonil.getAll = result => {
    sql.query("SELECT * FROM mst_tipe_personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("msttipepersonil: ", res);
        result(null, res);
    });
};

MstTipePersonil.updateById = (id, msttipepersonil, result) => {
    sql.query(
        "UPDATE mst_tipe_personil SET  nama = ? WHERE id = ?",
        [msttipepersonil.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MstTipePersonil with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated msttipepersonil: ", { id: id, ...msttipepersonil });
            result(null, { id: id, ...msttipepersonil });
        }
    );
};

MstTipePersonil.remove = (id, result) => {
    sql.query("DELETE FROM mst_tipe_personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MstTipePersonil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted msttipepersonil with id: ", id);
        result(null, res);
    });
};

MstTipePersonil.removeAll = result => {
    sql.query("DELETE FROM mst_tipe_personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} msttipepersonil`);
        result(null, res);
    });
};

module.exports = MstTipePersonil;

