const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const PemeriksaanKapal = function (pemeriksaankapal) {
    this.approval_status_id = pemeriksaankapal.approval_status_id;
    this.enable = pemeriksaankapal.enable;
    this.asset_kapal_id = pemeriksaankapal.asset_kapal_id;
    this.cabang_id = pemeriksaankapal.cabang_id;
    this.kondisi_id = pemeriksaankapal.kondisi_id;
    this.tanggal_awal = pemeriksaankapal.tanggal_awal;
    this.tanggal_akhir = pemeriksaankapal.tanggal_akhir;
    this.keterangan = pemeriksaankapal.keterangan;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'pemeriksaankapal';
		objek.action = objects.approval_status_id;
		objek.user_id = objects.user_id;
		objek.remark = objects.remark;
		objek.koneksi = koneksi;
		delete objects.date;
		delete objects.item;
		delete objects.action;
		delete objects.user_id;
		delete objects.remark;
		delete objects.koneksi;
		return objects
};

PemeriksaanKapal.create = async(newPemeriksaanKapal, result) => {
	try {
		newPemeriksaanKapal = setActivity(newPemeriksaanKapal);

		var check = newPemeriksaanKapal.check;
		for (var i in check) {
		    const kondisi_id = check[i].kondisi_id;
		    const tanggal_awal = f.toDate(check[i].tanggal_awal);
		    const tanggal_akhir = f.toDate(check[i].tanggal_akhir);
		    const keterangan = check[i].keterangan;
		    res = await query("INSERT INTO pemeriksaan_kapal (asset_kapal_id, cabang_id, kondisi_id, tanggal_awal, tanggal_akhir, keterangan) VALUES (1, 1, " + kondisi_id + ", '" + tanggal_awal + "', '" + tanggal_akhir + "', '" + keterangan + "')");
		}

		objek.koneksi = res.insertId;
		await query("INSERT INTO activity_log SET ?", objek);
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
    var query = "SELECT a.* , a1.nama as approval_status, a2.nama as ena, a3.nama_asset as asset_kapal, a4.nama as cabang, a5.nama as kondisi FROM pemeriksaan_kapal a LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN asset_kapal a3 ON a.asset_kapal_id = a3.id  LEFT JOIN cabang a4 ON a.cabang_id = a4.id  LEFT JOIN kondisi a5 ON a.kondisi_id = a5.id ";
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
		pemeriksaankapal = await setActivity(pemeriksaankapal, id);

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

		await query("INSERT INTO activity_log SET ?", objek);
		await query("UPDATE pemeriksaan_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...pemeriksaankapal });
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

