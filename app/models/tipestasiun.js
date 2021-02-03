const sql = require("../config/db.js");

// constructor
const TipeStasiun = function (tipestasiun) {
    this.nama = tipestasiun.nama;
};

TipeStasiun.create = (newTipeStasiun, result) => {
    sql.query("INSERT INTO tipe_stasiun SET ?", newTipeStasiun, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tipestasiun: ", { id: res.insertId, ...newTipeStasiun });
        result(null, { id: res.insertId, ...newTipeStasiun });
    });
};

TipeStasiun.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_stasiun WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tipestasiun: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TipeStasiun with the id
        result({ kind: "not_found" }, null);
    });
};

TipeStasiun.getAll = result => {
    sql.query("SELECT * FROM tipe_stasiun", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipestasiun: ", res);
        result(null, res);
    });
};

TipeStasiun.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_stasiun'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipestasiun: ", res);
        result(null, res);
    });
};

TipeStasiun.updateById = (id, tipestasiun, result) => {
	var str = "", obj = [], no = 1;
	for (var i in tipestasiun) {
	    if (tipestasiun[i]) {
	        str += i + " = ?, ";
	        obj.push(tipestasiun[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE tipe_stasiun SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TipeStasiun with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...tipestasiun });
        }
    );
};

TipeStasiun.remove = (id, result) => {
    sql.query("DELETE FROM tipe_stasiun WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeStasiun with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tipestasiun with id: ", id);
        result(null, res);
    });
};

TipeStasiun.removeAll = result => {
    sql.query("DELETE FROM tipe_stasiun", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tipestasiun`);
        result(null, res);
    });
};

module.exports = TipeStasiun;

