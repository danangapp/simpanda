const sql = require("../config/db.js");

// constructor
const SaranaBantuPemandu = function (saranabantupemandu) {
    this.approval_status_id = saranabantupemandu.approval_status_id;
    this.cabang_id = saranabantupemandu.cabang_id;
    this.tanggal_pemeriksaan = saranabantupemandu.tanggal_pemeriksaan;
    this.pelaksana = saranabantupemandu.pelaksana;
};

SaranaBantuPemandu.create = (newSaranaBantuPemandu, result) => {
    sql.query("INSERT INTO sarana_bantu_pemandu SET ?", newSaranaBantuPemandu, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created saranabantupemandu: ", { id: res.insertId, ...newSaranaBantuPemandu });
        result(null, { id: res.insertId, ...newSaranaBantuPemandu });
    });
};

SaranaBantuPemandu.findById = (id, result) => {
    sql.query(`SELECT * FROM sarana_bantu_pemandu WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found saranabantupemandu: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemandu with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemandu.getAll = result => {
    sql.query("SELECT * FROM sarana_bantu_pemandu", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("saranabantupemandu: ", res);
        result(null, res);
    });
};

SaranaBantuPemandu.updateById = (id, saranabantupemandu, result) => {
    sql.query(
        "UPDATE sarana_bantu_pemandu SET  approval_status_id = ?, cabang_id = ?, tanggal_pemeriksaan = ?, pelaksana = ? WHERE id = ?",
        [saranabantupemandu.approval_status_id, saranabantupemandu.cabang_id, saranabantupemandu.tanggal_pemeriksaan, saranabantupemandu.pelaksana, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SaranaBantuPemandu with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated saranabantupemandu: ", { id: id, ...saranabantupemandu });
            result(null, { id: id, ...saranabantupemandu });
        }
    );
};

SaranaBantuPemandu.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemandu with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted saranabantupemandu with id: ", id);
        result(null, res);
    });
};

SaranaBantuPemandu.removeAll = result => {
    sql.query("DELETE FROM sarana_bantu_pemandu", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} saranabantupemandu`);
        result(null, res);
    });
};

module.exports = SaranaBantuPemandu;

