const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Sertifikat = function (sertifikat) {
    this.tipe_cert_id = sertifikat.tipe_cert_id;
    this.personil_id = sertifikat.personil_id;
    this.no_sertifikat = sertifikat.no_sertifikat;
    this.issuer = sertifikat.issuer;
    this.tempat_keluar_sertifikat = sertifikat.tempat_keluar_sertifikat;
    this.tanggal_keluar_sertifikat = sertifikat.tanggal_keluar_sertifikat;
    this.tanggal_expire = sertifikat.tanggal_expire;
    this.reminder_date = sertifikat.reminder_date;
    this.sertifikat = sertifikat.sertifikat;
    this.sertifikat = sertifikat.sertifikat;
    this.date = sertifikat.date;
    this.item = sertifikat.item;
    this.action = sertifikat.action;
    this.user_id = sertifikat.user_id;
    this.remark = sertifikat.remark;
    this.koneksi = sertifikat.koneksi;
};

Sertifikat.create = async(newSertifikat, result) => {
	try {
		const sertifikat = newSertifikat.sertifikat;
		for (var i in sertifikat) {
		    const x = sertifikat[i];
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
				if (a != "sertifikat") {
				    value += "'" + val + "', ";
				} else {
				    var fileName = f.uploadFile64('sertifikat', val);
				    value += "'" + fileName + "', ";
				}
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		}

		delete newSertifikat.sertifikat;
		const res = await query("INSERT INTO sertifikat SET ?", newSertifikat);
		result(null, { id: res.insertId, ...newSertifikat });
	} catch (error) {
	    result(error, null);
	}
};

Sertifikat.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as tipe_cert, a2.nama as personil FROM sertifikat a  LEFT JOIN tipe_cert a1 ON a.tipe_cert_id = a1.id  LEFT JOIN personil a2 ON a.personil_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Sertifikat with the id
        result({ kind: "not_found" }, null);
    });
};

Sertifikat.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as tipe_cert, a2.nama as personil FROM sertifikat a  LEFT JOIN tipe_cert a1 ON a.tipe_cert_id = a1.id  LEFT JOIN personil a2 ON a.personil_id = a2.id ";
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
		wheres += "a.tipe_cert_id LIKE '%" + param.q + "%' OR a.personil_id LIKE '%" + param.q + "%' OR a.no_sertifikat LIKE '%" + param.q + "%' OR a.issuer LIKE '%" + param.q + "%' OR a.tempat_keluar_sertifikat LIKE '%" + param.q + "%' OR a.tanggal_keluar_sertifikat LIKE '%" + param.q + "%' OR a.tanggal_expire LIKE '%" + param.q + "%' OR a.reminder_date LIKE '%" + param.q + "%' OR a.sertifikat LIKE '%" + param.q + "%' OR a.sertifikat_id LIKE '%" + param.q + "%'";	
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

Sertifikat.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sertifikat'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Sertifikat.updateById = async(id, sertifikat, result) => {
	try {
		const sertifikat = sertifikat.sertifikat;
		for (var i in sertifikat) {
		    const x = sertifikat[i];
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
		        value += "'" + val + "', ";
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
		
			await query("DELETE FROM sertifikat WHERE id = ?", x.id);
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		}
		delete sertifikat.sertifikat;

		var str = "", obj = [], no = 1;
		for (var i in sertifikat) {
		    if (sertifikat[i]) {
		        str += i + " = ?, ";
		        obj.push(sertifikat[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE sertifikat SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...sertifikat });
	} catch (error) {
	    result(error, null);
	}
};

Sertifikat.remove = (id, result) => {
    sql.query("DELETE FROM sertifikat WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Sertifikat with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Sertifikat;

