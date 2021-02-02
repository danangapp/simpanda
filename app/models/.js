const sql = require("../config/db.js");

// constructor
const  = function () {
    this.nama = .nama;
    this.almt_cabang = .almt_cabang;
    this.cabang_cms = .cabang_cms;
    this.no_account_cabang = .no_account_cabang;
    this.nm_cabang_3digit = .nm_cabang_3digit;
    this.kd_account_cabang = .kd_account_cabang;
    this.kd_cabang_jai_puspel = .kd_cabang_jai_puspel;
    this.org_id = .org_id;
    this.port_code = .port_code;
    this.autospk = .autospk;
    this.kd_jenis_pelabuhan = .kd_jenis_pelabuhan;
};

.create = (new, result) => {
    sql.query("INSERT INTO  SET ?", new, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created : ", { id: res.insertId, ...new });
        result(null, { id: res.insertId, ...new });
    });
};

.findById = (id, result) => {
    sql.query(`SELECT * FROM  WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found : ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found  with the id
        result({ kind: "not_found" }, null);
    });
};

.getAll = result => {
    sql.query("SELECT * FROM ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(": ", res);
        result(null, res);
    });
};

.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = ''", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(": ", res);
        result(null, res);
    });
};

.updateById = (id, , result) => {
    sql.query(
        "UPDATE  SET  nama = ?, almt_cabang = ?, cabang_cms = ?, no_account_cabang = ?, nm_cabang_3digit = ?, kd_account_cabang = ?, kd_cabang_jai_puspel = ?, org_id = ?, port_code = ?, autospk = ?, kd_jenis_pelabuhan = ? WHERE id = ?",
        [.nama, .almt_cabang, .cabang_cms, .no_account_cabang, .nm_cabang_3digit, .kd_account_cabang, .kd_cabang_jai_puspel, .org_id, .port_code, .autospk, .kd_jenis_pelabuhan, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found  with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated : ", { id: id, ... });
            result(null, { id: id, ... });
        }
    );
};

.remove = (id, result) => {
    sql.query("DELETE FROM  WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found  with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted  with id: ", id);
        result(null, res);
    });
};

.removeAll = result => {
    sql.query("DELETE FROM ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} `);
        result(null, res);
    });
};

module.exports = ;

