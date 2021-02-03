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

SaranaBantuPemandu.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu'", (err, res) => {
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
	var str = "", obj = [], no = 1;
	for (var i in saranabantupemandu) {
	    if (saranabantupemandu[i]) {
	        str += i + " = ?, ";
	        obj.push(saranabantupemandu[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE sarana_bantu_pemandu SET " + str + " WHERE id = ?",
        obj,
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

