const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

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

AssetRumahDinas.create = async(newAssetRumahDinas, result) => {
	try {

		var obj = new Object();
		obj.date = newAssetRumahDinas.date;
		obj.item = newAssetRumahDinas.item;
		obj.action = newAssetRumahDinas.action;
		obj.user_id = newAssetRumahDinas.user_id;
		obj.remark = newAssetRumahDinas.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newAssetRumahDinas.date;
		delete newAssetRumahDinas.item;
		delete newAssetRumahDinas.action;
		delete newAssetRumahDinas.user_id;
		delete newAssetRumahDinas.remark;

		const res = await query("INSERT INTO asset_rumah_dinas SET ?", newAssetRumahDinas);
		result(null, { id: res.insertId, ...newAssetRumahDinas });
	} catch (error) {
	    result(error, null);
	}
};

AssetRumahDinas.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_rumah_dinas WHERE id = ${id}`, (err, res) => {
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
    var query = "SELECT * FROM asset_rumah_dinas";
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

		var obj = new Object();
		obj.date = AssetRumahDinas.date;
		obj.item = AssetRumahDinas.item;
		obj.action = AssetRumahDinas.action;
		obj.user_id = AssetRumahDinas.user_id;
		obj.remark = AssetRumahDinas.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete AssetRumahDinas.date;
		delete AssetRumahDinas.item;
		delete AssetRumahDinas.action;
		delete AssetRumahDinas.user_id;
		delete AssetRumahDinas.remark;


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

		await query("UPDATE asset_rumah_dinas SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
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

