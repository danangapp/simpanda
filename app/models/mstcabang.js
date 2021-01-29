const sql = require("../config/db.js");

// constructor
const MstCabang = function (mstcabang) {
    this.nama = mstcabang.nama;
};

MstCabang.create = (newMstCabang, result) => {
    sql.query("INSERT INTO mst_cabang SET ?", newMstCabang, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created mstcabang: ", { id: res.insertId, ...newMstCabang });
        result(null, { id: res.insertId, ...newMstCabang });
    });
};

MstCabang.findById = (id, result) => {
    sql.query(`SELECT * FROM mst_cabang WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found mstcabang: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found MstCabang with the id
        result({ kind: "not_found" }, null);
    });
};

MstCabang.getAll = result => {
    sql.query("SELECT * FROM mst_cabang", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("mstcabang: ", res);
        result(null, res);
    });
};

MstCabang.updateById = (id, mstcabang, result) => {
    sql.query(
        "UPDATE mst_cabang SET  nama = ? WHERE id = ?",
        [mstcabang.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MstCabang with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated mstcabang: ", { id: id, ...mstcabang });
            result(null, { id: id, ...mstcabang });
        }
    );
};

MstCabang.remove = (id, result) => {
    sql.query("DELETE FROM mst_cabang WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MstCabang with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted mstcabang with id: ", id);
        result(null, res);
    });
};

MstCabang.removeAll = result => {
    sql.query("DELETE FROM mst_cabang", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} mstcabang`);
        result(null, res);
    });
};

module.exports = MstCabang;

