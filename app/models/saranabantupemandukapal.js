const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const SaranaBantuPemanduKapal = function (saranabantupemandukapal) {
    this.sarana_bantu_pemandu_id = saranabantupemandukapal.sarana_bantu_pemandu_id;
    this.tipe_sarana_pemandu_kapal_id = saranabantupemandukapal.tipe_sarana_pemandu_kapal_id;
    this.dokumen_kapal_q1 = saranabantupemandukapal.dokumen_kapal_q1;
    this.dokumen_kapal_q2 = saranabantupemandukapal.dokumen_kapal_q2;
    this.dokumen_kapal_q3 = saranabantupemandukapal.dokumen_kapal_q3;
    this.dokumen_kapal_q4 = saranabantupemandukapal.dokumen_kapal_q4;
    this.dokumen_kapal_q5 = saranabantupemandukapal.dokumen_kapal_q5;
    this.dokumen_kapal_q6 = saranabantupemandukapal.dokumen_kapal_q6;
    this.dokumen_kapal_q7 = saranabantupemandukapal.dokumen_kapal_q7;
    this.dokumen_kapal_q8 = saranabantupemandukapal.dokumen_kapal_q8;
    this.dokumen_kapal_q9 = saranabantupemandukapal.dokumen_kapal_q9;
    this.dokumen_kapal_q10 = saranabantupemandukapal.dokumen_kapal_q10;
    this.dokumen_kapal_q11 = saranabantupemandukapal.dokumen_kapal_q11;
    this.dokumen_kapal_q12 = saranabantupemandukapal.dokumen_kapal_q12;
    this.dokumen_kapal_q13 = saranabantupemandukapal.dokumen_kapal_q13;
    this.dokumen_kapal_q14 = saranabantupemandukapal.dokumen_kapal_q14;
    this.dokumen_kapal_q15 = saranabantupemandukapal.dokumen_kapal_q15;
    this.kondisi_umum_q1 = saranabantupemandukapal.kondisi_umum_q1;
    this.kondisi_umum_q2 = saranabantupemandukapal.kondisi_umum_q2;
    this.kondisi_umum_q3 = saranabantupemandukapal.kondisi_umum_q3;
    this.kondisi_umum_q4 = saranabantupemandukapal.kondisi_umum_q4;
    this.kondisi_umum_q5 = saranabantupemandukapal.kondisi_umum_q5;
    this.kondisi_umum_q6 = saranabantupemandukapal.kondisi_umum_q6;
    this.pemeriksaan_performa_q1 = saranabantupemandukapal.pemeriksaan_performa_q1;
    this.pemeriksaan_performa_q2 = saranabantupemandukapal.pemeriksaan_performa_q2;
    this.pemeriksaan_performa_q3 = saranabantupemandukapal.pemeriksaan_performa_q3;
    this.pemeriksaan_performa_q4 = saranabantupemandukapal.pemeriksaan_performa_q4;
    this.pemeriksaan_performa_q5 = saranabantupemandukapal.pemeriksaan_performa_q5;
    this.pemeriksaan_fisik_a1 = saranabantupemandukapal.pemeriksaan_fisik_a1;
    this.pemeriksaan_fisik_a2 = saranabantupemandukapal.pemeriksaan_fisik_a2;
    this.pemeriksaan_fisik_a3 = saranabantupemandukapal.pemeriksaan_fisik_a3;
    this.pemeriksaan_fisik_a4 = saranabantupemandukapal.pemeriksaan_fisik_a4;
    this.pemeriksaan_fisik_a5 = saranabantupemandukapal.pemeriksaan_fisik_a5;
    this.pemeriksaan_fisik_a6 = saranabantupemandukapal.pemeriksaan_fisik_a6;
    this.pemeriksaan_fisik_a7 = saranabantupemandukapal.pemeriksaan_fisik_a7;
    this.pemeriksaan_fisik_b1 = saranabantupemandukapal.pemeriksaan_fisik_b1;
    this.pemeriksaan_fisik_b2 = saranabantupemandukapal.pemeriksaan_fisik_b2;
    this.pemeriksaan_fisik_b3 = saranabantupemandukapal.pemeriksaan_fisik_b3;
    this.pemeriksaan_fisik_b4 = saranabantupemandukapal.pemeriksaan_fisik_b4;
    this.pemeriksaan_fisik_b5 = saranabantupemandukapal.pemeriksaan_fisik_b5;
    this.pemeriksaan_fisik_b6 = saranabantupemandukapal.pemeriksaan_fisik_b6;
    this.pemeriksaan_fisik_b7 = saranabantupemandukapal.pemeriksaan_fisik_b7;
    this.pemeriksaan_fisik_b8 = saranabantupemandukapal.pemeriksaan_fisik_b8;
    this.pemeriksaan_fisik_b9 = saranabantupemandukapal.pemeriksaan_fisik_b9;
    this.pemeriksaan_fisik_c1 = saranabantupemandukapal.pemeriksaan_fisik_c1;
    this.pemeriksaan_fisik_c2 = saranabantupemandukapal.pemeriksaan_fisik_c2;
    this.pemeriksaan_fisik_c3 = saranabantupemandukapal.pemeriksaan_fisik_c3;
    this.pemeriksaan_fisik_c4 = saranabantupemandukapal.pemeriksaan_fisik_c4;
    this.pemeriksaan_fisik_c5 = saranabantupemandukapal.pemeriksaan_fisik_c5;
    this.pemeriksaan_fisik_c6 = saranabantupemandukapal.pemeriksaan_fisik_c6;
    this.pemeriksaan_fisik_c7 = saranabantupemandukapal.pemeriksaan_fisik_c7;
    this.pemeriksaan_fisik_d1 = saranabantupemandukapal.pemeriksaan_fisik_d1;
    this.pemeriksaan_fisik_d2 = saranabantupemandukapal.pemeriksaan_fisik_d2;
    this.pemeriksaan_fisik_d3 = saranabantupemandukapal.pemeriksaan_fisik_d3;
    this.pemeriksaan_fisik_d4 = saranabantupemandukapal.pemeriksaan_fisik_d4;
    this.pemeriksaan_fisik_d5 = saranabantupemandukapal.pemeriksaan_fisik_d5;
    this.pemeriksaan_fisik_d6 = saranabantupemandukapal.pemeriksaan_fisik_d6;
    this.pemeriksaan_fisik_d7 = saranabantupemandukapal.pemeriksaan_fisik_d7;
    this.pemeriksaan_fisik_d8 = saranabantupemandukapal.pemeriksaan_fisik_d8;
    this.pemeriksaan_fisik_d9 = saranabantupemandukapal.pemeriksaan_fisik_d9;
    this.pemeriksaan_fisik_e1 = saranabantupemandukapal.pemeriksaan_fisik_e1;
    this.pemeriksaan_fisik_e2 = saranabantupemandukapal.pemeriksaan_fisik_e2;
    this.pemeriksaan_fisik_e3 = saranabantupemandukapal.pemeriksaan_fisik_e3;
    this.pemeriksaan_fisik_f1 = saranabantupemandukapal.pemeriksaan_fisik_f1;
    this.pemeriksaan_fisik_f2 = saranabantupemandukapal.pemeriksaan_fisik_f2;
    this.pemeriksaan_fisik_f3 = saranabantupemandukapal.pemeriksaan_fisik_f3;
    this.pemeriksaan_fisik_f4 = saranabantupemandukapal.pemeriksaan_fisik_f4;
};

SaranaBantuPemanduKapal.create = async(newSaranaBantuPemanduKapal, result) => {
	try {
		const res = await query("INSERT INTO sarana_bantu_pemandu_kapal SET ?", newSaranaBantuPemanduKapal);
		result(null, { id: res.insertId, ...newSaranaBantuPemanduKapal });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemanduKapal.findById = (id, result) => {
    sql.query(`SELECT a.* , a1.nama as sarana_bantu_pemandu, a2.nama as tipe_sarana_pemandu_kapal FROM sarana_bantu_pemandu_kapal a  LEFT JOIN sarana_bantu_pemandu a1 ON a.sarana_bantu_pemandu_id = a1.id  LEFT JOIN tipe_sarana_pemandu_kapal a2 ON a.tipe_sarana_pemandu_kapal_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemanduKapal with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemanduKapal.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as sarana_bantu_pemandu, a2.nama as tipe_sarana_pemandu_kapal FROM sarana_bantu_pemandu_kapal a  LEFT JOIN sarana_bantu_pemandu a1 ON a.sarana_bantu_pemandu_id = a1.id  LEFT JOIN tipe_sarana_pemandu_kapal a2 ON a.tipe_sarana_pemandu_kapal_id = a2.id ";
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
		wheres += "a.sarana_bantu_pemandu_id LIKE '%1234%' OR a.tipe_sarana_pemandu_kapal_id LIKE '%1234%' OR a.dokumen_kapal_q1 LIKE '%1234%' OR a.dokumen_kapal_q2 LIKE '%1234%' OR a.dokumen_kapal_q3 LIKE '%1234%' OR a.dokumen_kapal_q4 LIKE '%1234%' OR a.dokumen_kapal_q5 LIKE '%1234%' OR a.dokumen_kapal_q6 LIKE '%1234%' OR a.dokumen_kapal_q7 LIKE '%1234%' OR a.dokumen_kapal_q8 LIKE '%1234%' OR a.dokumen_kapal_q9 LIKE '%1234%' OR a.dokumen_kapal_q10 LIKE '%1234%' OR a.dokumen_kapal_q11 LIKE '%1234%' OR a.dokumen_kapal_q12 LIKE '%1234%' OR a.dokumen_kapal_q13 LIKE '%1234%' OR a.dokumen_kapal_q14 LIKE '%1234%' OR a.dokumen_kapal_q15 LIKE '%1234%' OR a.kondisi_umum_q1 LIKE '%1234%' OR a.kondisi_umum_q2 LIKE '%1234%' OR a.kondisi_umum_q3 LIKE '%1234%' OR a.kondisi_umum_q4 LIKE '%1234%' OR a.kondisi_umum_q5 LIKE '%1234%' OR a.kondisi_umum_q6 LIKE '%1234%' OR a.pemeriksaan_performa_q1 LIKE '%1234%' OR a.pemeriksaan_performa_q2 LIKE '%1234%' OR a.pemeriksaan_performa_q3 LIKE '%1234%' OR a.pemeriksaan_performa_q4 LIKE '%1234%' OR a.pemeriksaan_performa_q5 LIKE '%1234%' OR a.pemeriksaan_fisik_a1 LIKE '%1234%' OR a.pemeriksaan_fisik_a2 LIKE '%1234%' OR a.pemeriksaan_fisik_a3 LIKE '%1234%' OR a.pemeriksaan_fisik_a4 LIKE '%1234%' OR a.pemeriksaan_fisik_a5 LIKE '%1234%' OR a.pemeriksaan_fisik_a6 LIKE '%1234%' OR a.pemeriksaan_fisik_a7 LIKE '%1234%' OR a.pemeriksaan_fisik_b1 LIKE '%1234%' OR a.pemeriksaan_fisik_b2 LIKE '%1234%' OR a.pemeriksaan_fisik_b3 LIKE '%1234%' OR a.pemeriksaan_fisik_b4 LIKE '%1234%' OR a.pemeriksaan_fisik_b5 LIKE '%1234%' OR a.pemeriksaan_fisik_b6 LIKE '%1234%' OR a.pemeriksaan_fisik_b7 LIKE '%1234%' OR a.pemeriksaan_fisik_b8 LIKE '%1234%' OR a.pemeriksaan_fisik_b9 LIKE '%1234%' OR a.pemeriksaan_fisik_c1 LIKE '%1234%' OR a.pemeriksaan_fisik_c2 LIKE '%1234%' OR a.pemeriksaan_fisik_c3 LIKE '%1234%' OR a.pemeriksaan_fisik_c4 LIKE '%1234%' OR a.pemeriksaan_fisik_c5 LIKE '%1234%' OR a.pemeriksaan_fisik_c6 LIKE '%1234%' OR a.pemeriksaan_fisik_c7 LIKE '%1234%' OR a.pemeriksaan_fisik_d1 LIKE '%1234%' OR a.pemeriksaan_fisik_d2 LIKE '%1234%' OR a.pemeriksaan_fisik_d3 LIKE '%1234%' OR a.pemeriksaan_fisik_d4 LIKE '%1234%' OR a.pemeriksaan_fisik_d5 LIKE '%1234%' OR a.pemeriksaan_fisik_d6 LIKE '%1234%' OR a.pemeriksaan_fisik_d7 LIKE '%1234%' OR a.pemeriksaan_fisik_d8 LIKE '%1234%' OR a.pemeriksaan_fisik_d9 LIKE '%1234%' OR a.pemeriksaan_fisik_e1 LIKE '%1234%' OR a.pemeriksaan_fisik_e2 LIKE '%1234%' OR a.pemeriksaan_fisik_e3 LIKE '%1234%' OR a.pemeriksaan_fisik_f1 LIKE '%1234%' OR a.pemeriksaan_fisik_f2 LIKE '%1234%' OR a.pemeriksaan_fisik_f3 LIKE '%1234%' OR a.pemeriksaan_fisik_f4 LIKE '%1234%'";	
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

SaranaBantuPemanduKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

SaranaBantuPemanduKapal.updateById = async(id, saranabantupemandukapal, result) => {
	try {

		var str = "", obj = [], no = 1;
		for (var i in saranabantupemandukapal) {
		    if (saranabantupemandukapal[i]) {
		        str += i + " = ?, ";
		        obj.push(saranabantupemandukapal[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE sarana_bantu_pemandu_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...saranabantupemandukapal });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemanduKapal.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemanduKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = SaranaBantuPemanduKapal;

