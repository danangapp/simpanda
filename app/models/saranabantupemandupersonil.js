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
    sql.query(`SELECT * FROM sarana_bantu_pemandu_personil WHERE id = ${id}`, (err, res) => {
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
    var query = "SELECT a.* , a1.nama as sarana_bantu_pemandu, a2.nama_asset as asset_kapal, a3.nama as status_ijazah FROM sarana_bantu_pemandu_personil a LEFT JOIN sarana_bantu_pemandu a1 ON a.sarana_bantu_pemandu_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  LEFT JOIN status_ijazah a3 ON a.status_ijazah_id = a3.id ";
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

		await query("INSERT INTO activity_log SET ?", objek);
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

