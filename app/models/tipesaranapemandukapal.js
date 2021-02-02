const sql = require("../config/db.js");

// constructor
const TipeSaranaPemanduKapal = function (tipesaranapemandukapal) {
    this.nama = tipesaranapemandukapal.nama;
};

TipeSaranaPemanduKapal.create = (newTipeSaranaPemanduKapal, result) => {
    sql.query("INSERT INTO tipe_sarana_pemandu_kapal SET ?", newTipeSaranaPemanduKapal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tipesaranapemandukapal: ", { id: res.insertId, ...newTipeSaranaPemanduKapal });
        result(null, { id: res.insertId, ...newTipeSaranaPemanduKapal });
    });
};

TipeSaranaPemanduKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_sarana_pemandu_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tipesaranapemandukapal: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TipeSaranaPemanduKapal with the id
        result({ kind: "not_found" }, null);
    });
};

TipeSaranaPemanduKapal.getAll = result => {
    sql.query("SELECT * FROM tipe_sarana_pemandu_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipesaranapemandukapal: ", res);
        result(null, res);
    });
};

TipeSaranaPemanduKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_sarana_pemandu_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipesaranapemandukapal: ", res);
        result(null, res);
    });
};

TipeSaranaPemanduKapal.updateById = (id, tipesaranapemandukapal, result) => {
    sql.query(
        "UPDATE tipe_sarana_pemandu_kapal SET  nama = ? WHERE id = ?",
        [tipesaranapemandukapal.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TipeSaranaPemanduKapal with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tipesaranapemandukapal: ", { id: id, ...tipesaranapemandukapal });
            result(null, { id: id, ...tipesaranapemandukapal });
        }
    );
};

TipeSaranaPemanduKapal.remove = (id, result) => {
    sql.query("DELETE FROM tipe_sarana_pemandu_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeSaranaPemanduKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tipesaranapemandukapal with id: ", id);
        result(null, res);
    });
};

TipeSaranaPemanduKapal.removeAll = result => {
    sql.query("DELETE FROM tipe_sarana_pemandu_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tipesaranapemandukapal`);
        result(null, res);
    });
};

module.exports = TipeSaranaPemanduKapal;

