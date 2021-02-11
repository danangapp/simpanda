const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const TipeSaranaPemanduKapal = function (tipesaranapemandukapal) {
    this.nama = tipesaranapemandukapal.nama;
};

TipeSaranaPemanduKapal.create = async(newTipeSaranaPemanduKapal, result) => {
	try {
		const res = await query("INSERT INTO tipe_sarana_pemandu_kapal SET ?", newTipeSaranaPemanduKapal);
		result(null, { id: res.insertId, ...newTipeSaranaPemanduKapal });
	} catch (error) {
	    result(error, null);
	}
};

TipeSaranaPemanduKapal.findById = (id, result) => {
    sql.query(`SELECT a.*  FROM tipe_sarana_pemandu_kapal a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipeSaranaPemanduKapal with the id
        result({ kind: "not_found" }, null);
    });
};

TipeSaranaPemanduKapal.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.*  FROM tipe_sarana_pemandu_kapal a ";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += "a." + i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += "a." + i + " ='" + param[i] + "' and ";
            }
        }

        query = query.substring(0, query.length - 5);
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

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

        result(null, res);
    });
};

TipeSaranaPemanduKapal.updateById = async(id, tipesaranapemandukapal, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in tipesaranapemandukapal) {
		    if (tipesaranapemandukapal[i]) {
		        str += i + " = ?, ";
		        obj.push(tipesaranapemandukapal[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE tipe_sarana_pemandu_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...tipesaranapemandukapal });
	} catch (error) {
	    result(error, null);
	}
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

        result(null, res);
    });
};

module.exports = TipeSaranaPemanduKapal;

