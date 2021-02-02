const sql = require("../config/db.js");

// constructor
const SaranaBantuPemanduPersonil = function (saranabantupemandupersonil) {
    this.sarana_bantu_pemandu_id = saranabantupemandupersonil.sarana_bantu_pemandu_id;
    this.nama = saranabantupemandupersonil.nama;
    this.jabatan = saranabantupemandupersonil.jabatan;
    this.asset_kapal_id = saranabantupemandupersonil.asset_kapal_id;
    this.status_ijazah_id = saranabantupemandupersonil.status_ijazah_id;
};

SaranaBantuPemanduPersonil.create = (newSaranaBantuPemanduPersonil, result) => {
    sql.query("INSERT INTO sarana_bantu_pemandu_personil SET ?", newSaranaBantuPemanduPersonil, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created saranabantupemandupersonil: ", { id: res.insertId, ...newSaranaBantuPemanduPersonil });
        result(null, { id: res.insertId, ...newSaranaBantuPemanduPersonil });
    });
};

SaranaBantuPemanduPersonil.findById = (id, result) => {
    sql.query(`SELECT * FROM sarana_bantu_pemandu_personil WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found saranabantupemandupersonil: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemanduPersonil with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemanduPersonil.getAll = result => {
    sql.query("SELECT * FROM sarana_bantu_pemandu_personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("saranabantupemandupersonil: ", res);
        result(null, res);
    });
};

SaranaBantuPemanduPersonil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu_personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("saranabantupemandupersonil: ", res);
        result(null, res);
    });
};

SaranaBantuPemanduPersonil.updateById = (id, saranabantupemandupersonil, result) => {
    sql.query(
        "UPDATE sarana_bantu_pemandu_personil SET  sarana_bantu_pemandu_id = ?, nama = ?, jabatan = ?, asset_kapal_id = ?, status_ijazah_id = ? WHERE id = ?",
        [saranabantupemandupersonil.sarana_bantu_pemandu_id, saranabantupemandupersonil.nama, saranabantupemandupersonil.jabatan, saranabantupemandupersonil.asset_kapal_id, saranabantupemandupersonil.status_ijazah_id, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SaranaBantuPemanduPersonil with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated saranabantupemandupersonil: ", { id: id, ...saranabantupemandupersonil });
            result(null, { id: id, ...saranabantupemandupersonil });
        }
    );
};

SaranaBantuPemanduPersonil.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu_personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemanduPersonil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted saranabantupemandupersonil with id: ", id);
        result(null, res);
    });
};

SaranaBantuPemanduPersonil.removeAll = result => {
    sql.query("DELETE FROM sarana_bantu_pemandu_personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} saranabantupemandupersonil`);
        result(null, res);
    });
};

module.exports = SaranaBantuPemanduPersonil;

