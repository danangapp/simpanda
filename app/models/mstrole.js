const sql = require("../config/db.js");

// constructor
const MstRole = function (mstrole) {
    this.nama = mstrole.nama;
};

MstRole.create = (newMstRole, result) => {
    sql.query("INSERT INTO mst_role SET ?", newMstRole, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created mstrole: ", { id: res.insertId, ...newMstRole });
        result(null, { id: res.insertId, ...newMstRole });
    });
};

MstRole.findById = (id, result) => {
    sql.query(`SELECT * FROM mst_role WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found mstrole: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found MstRole with the id
        result({ kind: "not_found" }, null);
    });
};

MstRole.getAll = result => {
    sql.query("SELECT * FROM mst_role", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("mstrole: ", res);
        result(null, res);
    });
};

MstRole.updateById = (id, mstrole, result) => {
    sql.query(
        "UPDATE mst_role SET  nama = ? WHERE id = ?",
        [mstrole.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MstRole with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated mstrole: ", { id: id, ...mstrole });
            result(null, { id: id, ...mstrole });
        }
    );
};

MstRole.remove = (id, result) => {
    sql.query("DELETE FROM mst_role WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MstRole with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted mstrole with id: ", id);
        result(null, res);
    });
};

MstRole.removeAll = result => {
    sql.query("DELETE FROM mst_role", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} mstrole`);
        result(null, res);
    });
};

module.exports = MstRole;

