const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const PemeriksaanKapalCheckData = function (pemeriksaankapalcheckdata) {
    this.kondisi_id = pemeriksaankapalcheckdata.kondisi_id;
    this.tanggal_awal = pemeriksaankapalcheckdata.tanggal_awal;
    this.tanggal_akhir = pemeriksaankapalcheckdata.tanggal_akhir;
    this.keterangan = pemeriksaankapalcheckdata.keterangan;
    this.pemeriksaan_kapal_id = pemeriksaankapalcheckdata.pemeriksaan_kapal_id;
};

PemeriksaanKapalCheckData.create = async(newPemeriksaanKapalCheckData, result) => {
	try {
		const res = await query("INSERT INTO pemeriksaan_kapal_check_data SET ?", newPemeriksaanKapalCheckData);
		result(null, { id: res.insertId, ...newPemeriksaanKapalCheckData });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapalCheckData.findById = (id, result) => {
    sql.query(`SELECT * FROM pemeriksaan_kapal_check_data WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found PemeriksaanKapalCheckData with the id
        result({ kind: "not_found" }, null);
    });
};

PemeriksaanKapalCheckData.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as kondisi, a2.nama as pemeriksaan_kapal FROM pemeriksaan_kapal_check_data a LEFT JOIN kondisi a1 ON a.kondisi_id = a1.id  LEFT JOIN pemeriksaan_kapal a2 ON a.pemeriksaan_kapal_id = a2.id ";
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

PemeriksaanKapalCheckData.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pemeriksaan_kapal_check_data'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

PemeriksaanKapalCheckData.updateById = async(id, pemeriksaankapalcheckdata, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in pemeriksaankapalcheckdata) {
		    if (pemeriksaankapalcheckdata[i]) {
		        str += i + " = ?, ";
		        obj.push(pemeriksaankapalcheckdata[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("INSERT INTO activity_log SET ?", objek);
		await query("UPDATE pemeriksaan_kapal_check_data SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...pemeriksaankapalcheckdata });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapalCheckData.remove = (id, result) => {
    sql.query("DELETE FROM pemeriksaan_kapal_check_data WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PemeriksaanKapalCheckData with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = PemeriksaanKapalCheckData;

