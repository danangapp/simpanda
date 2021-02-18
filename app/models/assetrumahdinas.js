const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const AssetRumahDinas = function (assetrumahdinas) {
    this.nama_assets = assetrumahdinas.nama_assets;
    this.satuan = assetrumahdinas.satuan;
    this.tahun_perolehan = assetrumahdinas.tahun_perolehan;
    this.nilai_perolehan = assetrumahdinas.nilai_perolehan;
    this.wilayah = assetrumahdinas.wilayah;
    this.nilai_buku = assetrumahdinas.nilai_buku;
    this.approval_status_id = assetrumahdinas.approval_status_id;
    this.tanggal = assetrumahdinas.tanggal;
    this.nilai = assetrumahdinas.nilai;
    this.catatan = assetrumahdinas.catatan;
    this.enable = assetrumahdinas.enable;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'assetrumahdinas';
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

AssetRumahDinas.create = async(newAssetRumahDinas, result) => {
	try {
		newAssetRumahDinas = setActivity(newAssetRumahDinas);
		const res = await query("INSERT INTO asset_rumah_dinas SET ?", newAssetRumahDinas);
		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newAssetRumahDinas });
	} catch (error) {
	    result(error, null);
	}
};

AssetRumahDinas.findById = (id, result) => {
    sql.query(`SELECT a.* , a1.nama as approval_status, a2.nama as ena FROM asset_rumah_dinas a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found AssetRumahDinas with the id
        result({ kind: "not_found" }, null);
    });
};

AssetRumahDinas.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as approval_status, a2.nama as ena FROM asset_rumah_dinas a  LEFT JOIN approval_status a1 ON a.approval_status_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id ";
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
	wheres += "a.nama_assets LIKE '%1234%' OR a.satuan LIKE '%1234%' OR a.tahun_perolehan LIKE '%1234%' OR a.nilai_perolehan LIKE '%1234%' OR a.wilayah LIKE '%1234%' OR a.nilai_buku LIKE '%1234%' OR a.approval_status_id LIKE '%1234%' OR a.tanggal LIKE '%1234%' OR a.nilai LIKE '%1234%' OR a.catatan LIKE '%1234%' OR a.enable LIKE '%1234%'";	
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

AssetRumahDinas.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'asset_rumah_dinas'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

AssetRumahDinas.updateById = async(id, assetrumahdinas, result) => {
	try {
		assetrumahdinas = await setActivity(assetrumahdinas, id);

		var str = "", obj = [], no = 1;
		for (var i in assetrumahdinas) {
		    if (assetrumahdinas[i]) {
		        str += i + " = ?, ";
		        obj.push(assetrumahdinas[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE asset_rumah_dinas SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...assetrumahdinas });
	} catch (error) {
	    result(error, null);
	}
};

AssetRumahDinas.remove = (id, result) => {
    sql.query("DELETE FROM asset_rumah_dinas WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AssetRumahDinas with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = AssetRumahDinas;

