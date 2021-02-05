const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const PemeriksaanKapal = function (pemeriksaankapal) {
    this.approval_status_id = pemeriksaankapal.approval_status_id;
    this.asset_kapal_id = pemeriksaankapal.asset_kapal_id;
    this.cabang = pemeriksaankapal.cabang;
    this.kondisi_id = pemeriksaankapal.kondisi_id;
    this.tanggal_awal = pemeriksaankapal.tanggal_awal;
    this.tanggal_akhir = pemeriksaankapal.tanggal_akhir;
    this.keterangan = pemeriksaankapal.keterangan;
};

PemeriksaanKapal.create = async(newPemeriksaanKapal, result) => {
	try {

		var obj = new Object();
		obj.date = newPemeriksaanKapal.date;
		obj.item = newPemeriksaanKapal.item;
		obj.action = newPemeriksaanKapal.action;
		obj.user_id = newPemeriksaanKapal.user_id;
		obj.remark = newPemeriksaanKapal.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newPemeriksaanKapal.date;
		delete newPemeriksaanKapal.item;
		delete newPemeriksaanKapal.action;
		delete newPemeriksaanKapal.user_id;
		delete newPemeriksaanKapal.remark;

		const res = await query("INSERT INTO pemeriksaan_kapal SET ?", newPemeriksaanKapal);
		result(null, { id: res.insertId, ...newPemeriksaanKapal });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM pemeriksaan_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found PemeriksaanKapal with the id
        result({ kind: "not_found" }, null);
    });
};

PemeriksaanKapal.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM pemeriksaan_kapal";
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

PemeriksaanKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pemeriksaan_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

PemeriksaanKapal.updateById = async(id, pemeriksaankapal, result) => {
	try {

		var obj = new Object();
		obj.date = PemeriksaanKapal.date;
		obj.item = PemeriksaanKapal.item;
		obj.action = PemeriksaanKapal.action;
		obj.user_id = PemeriksaanKapal.user_id;
		obj.remark = PemeriksaanKapal.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete PemeriksaanKapal.date;
		delete PemeriksaanKapal.item;
		delete PemeriksaanKapal.action;
		delete PemeriksaanKapal.user_id;
		delete PemeriksaanKapal.remark;


		var str = "", obj = [], no = 1;
		for (var i in pemeriksaankapal) {
		    if (pemeriksaankapal[i]) {
		        str += i + " = ?, ";
		        obj.push(pemeriksaankapal[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE pemeriksaan_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
	} catch (error) {
	    result(error, null);
	}
};

PemeriksaanKapal.remove = (id, result) => {
    sql.query("DELETE FROM pemeriksaan_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PemeriksaanKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = PemeriksaanKapal;

