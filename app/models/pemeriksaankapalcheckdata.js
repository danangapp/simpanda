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
    this.pemeriksaan_kapal_check_id = pemeriksaankapalcheckdata.pemeriksaan_kapal_check_id;
};

PemeriksaanKapalCheckData.create = async(newPemeriksaanKapalCheckData, result) => {
	try {
		const res = await query("INSERT INTO pemeriksaan_kapal_check_data SET ?", newPemeriksaanKapalCheckData);
		result(null, { id: res.insertId, ...newPemeriksaanKapalCheckData });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapalCheckData.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as kondisi, a2.nama as pemeriksaan_kapal, a3.nama as pemeriksaan_kapal_check FROM pemeriksaan_kapal_check_data a  LEFT JOIN kondisi a1 ON a.kondisi_id = a1.id  LEFT JOIN pemeriksaan_kapal a2 ON a.pemeriksaan_kapal_id = a2.id  LEFT JOIN pemeriksaan_kapal_check a3 ON a.pemeriksaan_kapal_check_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
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
    var wheres = "";
    var query = "SELECT a.* , a1.nama as kondisi, a2.nama as pemeriksaan_kapal, a3.nama as pemeriksaan_kapal_check FROM pemeriksaan_kapal_check_data a  LEFT JOIN kondisi a1 ON a.kondisi_id = a1.id  LEFT JOIN pemeriksaan_kapal a2 ON a.pemeriksaan_kapal_id = a2.id  LEFT JOIN pemeriksaan_kapal_check a3 ON a.pemeriksaan_kapal_check_id = a3.id ";
    if (length > 0) {
        wheres += " WHERE ";
        for (var i in param) {
        	if (i != "q") {
        	    var str = param[i];
        	    if (typeof str != "string") {
					var wherein = "";
					for (var x in str) {
					    wherein += str[x] + ", ";
					}
					wherein = wherein.substring(0, wherein.length - 2);
					wheres += "a." + i + " IN (" + wherein + ")";
					wheres += " and ";
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
		wheres += wheres.length == 7 ? "(" : "AND (";
		wheres += "a.kondisi_id LIKE '%" + param.q + "%' OR a.tanggal_awal LIKE '%" + param.q + "%' OR a.tanggal_akhir LIKE '%" + param.q + "%' OR a.keterangan LIKE '%" + param.q + "%' OR a.pemeriksaan_kapal_id LIKE '%" + param.q + "%' OR a.pemeriksaan_kapal_check_id LIKE '%" + param.q + "%'";	
		wheres += ")";
   }

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

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
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

