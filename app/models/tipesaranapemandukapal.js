const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const TipeSaranaPemanduKapal = function (tipesaranapemandukapal) {
    this.nama = tipesaranapemandukapal.nama;
    this.date = tipesaranapemandukapal.date;
    this.item = tipesaranapemandukapal.item;
    this.action = tipesaranapemandukapal.action;
    this.user_id = tipesaranapemandukapal.user_id;
    this.remark = tipesaranapemandukapal.remark;
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
    sql.query(`SELECT * FROM tipe_sarana_pemandu_kapal WHERE id = ${id}`, (err, res) => {
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
    var query = "SELECT * FROM tipe_sarana_pemandu_kapal";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += i + " ='" + param[i] + "' and ";
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

		await query("UPDATE tipe_sarana_pemandu_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
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

