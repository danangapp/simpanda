const sql = require("../config/db.js");

// constructor
const TipePersonil = function (tipepersonil) {
    this.nama = tipepersonil.nama;
};

TipePersonil.create = (newTipePersonil, result) => {
    sql.query("INSERT INTO tipe_personil SET ?", newTipePersonil, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tipepersonil: ", { id: res.insertId, ...newTipePersonil });
        result(null, { id: res.insertId, ...newTipePersonil });
    });
};

TipePersonil.findById = (id, result) => {
    sql.query(`SELECT * FROM tipe_personil WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tipepersonil: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TipePersonil with the id
        result({ kind: "not_found" }, null);
    });
};

TipePersonil.getAll = result => {
    sql.query("SELECT * FROM tipe_personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipepersonil: ", res);
        result(null, res);
    });
};

TipePersonil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tipepersonil: ", res);
        result(null, res);
    });
};

TipePersonil.updateById = (id, tipepersonil, result) => {
	var str = "", obj = [], no = 1;
	for (var i in tipepersonil) {
	    if (tipepersonil[i]) {
	        str += i + " = ?, ";
	        obj.push(tipepersonil[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE tipe_personil SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TipePersonil with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...tipepersonil });
        }
    );
};

TipePersonil.remove = (id, result) => {
    sql.query("DELETE FROM tipe_personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipePersonil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tipepersonil with id: ", id);
        result(null, res);
    });
};

TipePersonil.removeAll = result => {
    sql.query("DELETE FROM tipe_personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tipepersonil`);
        result(null, res);
    });
};

module.exports = TipePersonil;

