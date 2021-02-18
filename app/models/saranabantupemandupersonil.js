const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const SaranaBantuPemanduPersonil = function (saranabantupemandupersonil) {
    this.sarana_bantu_pemandu_id = saranabantupemandupersonil.sarana_bantu_pemandu_id;
    this.nama = saranabantupemandupersonil.nama;
    this.jabatan = saranabantupemandupersonil.jabatan;
    this.asset_kapal_id = saranabantupemandupersonil.asset_kapal_id;
    this.status_ijazah_id = saranabantupemandupersonil.status_ijazah_id;
};

SaranaBantuPemanduPersonil.create = async(newSaranaBantuPemanduPersonil, result) => {
	try {
		const res = await query("INSERT INTO sarana_bantu_pemandu_personil SET ?", newSaranaBantuPemanduPersonil);
		result(null, { id: res.insertId, ...newSaranaBantuPemanduPersonil });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemanduPersonil.findById = (id, result) => {
    sql.query(`SELECT a.* , a1.nama as sarana_bantu_pemandu, a2.nama_asset as asset_kapal, a3.nama as status_ijazah FROM sarana_bantu_pemandu_personil a  LEFT JOIN sarana_bantu_pemandu a1 ON a.sarana_bantu_pemandu_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  LEFT JOIN status_ijazah a3 ON a.status_ijazah_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemanduPersonil with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemanduPersonil.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as sarana_bantu_pemandu, a2.nama_asset as asset_kapal, a3.nama as status_ijazah FROM sarana_bantu_pemandu_personil a  LEFT JOIN sarana_bantu_pemandu a1 ON a.sarana_bantu_pemandu_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  LEFT JOIN status_ijazah a3 ON a.status_ijazah_id = a3.id ";
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

	wheres += wheres.length == 7 ? "(" : "OR (";
	wheres += "a.sarana_bantu_pemandu_id LIKE '%1234%' OR a.nama LIKE '%1234%' OR a.jabatan LIKE '%1234%' OR a.asset_kapal_id LIKE '%1234%' OR a.status_ijazah_id LIKE '%1234%'";	
	wheres += ")";
    query += wheres;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

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

        result(null, res);
    });
};

SaranaBantuPemanduPersonil.updateById = async(id, saranabantupemandupersonil, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in saranabantupemandupersonil) {
		    if (saranabantupemandupersonil[i]) {
		        str += i + " = ?, ";
		        obj.push(saranabantupemandupersonil[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE sarana_bantu_pemandu_personil SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...saranabantupemandupersonil });
	} catch (error) {
	    result(error, null);
	}
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

        result(null, res);
    });
};

module.exports = SaranaBantuPemanduPersonil;

