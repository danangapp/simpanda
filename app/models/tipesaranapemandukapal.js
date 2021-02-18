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

TipeSaranaPemanduKapal.findById = async (id, result) => {
const resQuery = await query("SELECT pemeriksaan_kapal_check_id, tanggal_awal, tanggal_akhir, keterangan FROM pemeriksaan_kapal_check_data WHERE pemeriksaan_kapal_id = '" + id + "'");
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
    var wheres = "";
    var query = "SELECT a.*  FROM tipe_sarana_pemandu_kapal a ";
    if (length > 0) {
        wheres += " WHERE ";
        for (var i in param) {
        	if (i != "q") {
        	    var str = param[i];
        	    if (typeof str != "string") {
        	        wheres += "(";
        	        for (var x in str) {
        	            wheres += "a." + i + " ='" + str[x] + "' or ";
        	        }
        	        wheres = wheres.substring(0, wheres.length - 4);
        	        wheres += ") and ";
        	    } else {
        	        wheres += "a." + i + " ='" + param[i] + "' and ";
        	    }
        	}
        }

        if (wheres.length > 7){
        	wheres = wheres.substring(0, wheres.length - 5);
        }
    }

	if (param.q) {
		wheres += wheres.length == 7 ? "(" : "OR (";
		wheres += "a.nama LIKE '%1234%'";	
		wheres += ")";
    	query += wheres;
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

