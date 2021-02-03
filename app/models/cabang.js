const sql = require("../config/db.js");

// constructor
const Cabang = function (cabang) {
    this.nama = cabang.nama;
    this.almt_cabang = cabang.almt_cabang;
    this.cabang_cms = cabang.cabang_cms;
    this.no_account_cabang = cabang.no_account_cabang;
    this.nm_cabang_3digit = cabang.nm_cabang_3digit;
    this.kd_account_cabang = cabang.kd_account_cabang;
    this.kd_cabang_jai_puspel = cabang.kd_cabang_jai_puspel;
    this.org_id = cabang.org_id;
    this.port_code = cabang.port_code;
    this.autospk = cabang.autospk;
    this.kd_jenis_pelabuhan = cabang.kd_jenis_pelabuhan;
};

Cabang.create = (newCabang, result) => {
    sql.query("INSERT INTO cabang SET ?", newCabang, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created cabang: ", { id: res.insertId, ...newCabang });
        result(null, { id: res.insertId, ...newCabang });
    });
};

Cabang.findById = (id, result) => {
    sql.query(`SELECT * FROM cabang WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found cabang: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Cabang with the id
        result({ kind: "not_found" }, null);
    });
};

Cabang.getAll = result => {
    sql.query("SELECT * FROM cabang", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cabang: ", res);
        result(null, res);
    });
};

Cabang.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'cabang'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cabang: ", res);
        result(null, res);
    });
};

Cabang.updateById = (id, cabang, result) => {
	var str = "", obj = [], no = 1;
	for (var i in cabang) {
	    if (cabang[i]) {
	        str += i + " = ?, ";
	        obj.push(cabang[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE cabang SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Cabang with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...cabang });
        }
    );
};

Cabang.remove = (id, result) => {
    sql.query("DELETE FROM cabang WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Cabang with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted cabang with id: ", id);
        result(null, res);
    });
};

Cabang.removeAll = result => {
    sql.query("DELETE FROM cabang", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} cabang`);
        result(null, res);
    });
};

module.exports = Cabang;

