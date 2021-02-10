const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const AssetStasiunEquipment = function (assetstasiunequipment) {
    this.nomor_asset = assetstasiunequipment.nomor_asset;
    this.tipe_asset_id = assetstasiunequipment.tipe_asset_id;
    this.nama = assetstasiunequipment.nama;
    this.tahun_perolehan = assetstasiunequipment.tahun_perolehan;
    this.nilai_perolehan = assetstasiunequipment.nilai_perolehan;
    this.kondisi = assetstasiunequipment.kondisi;
    this.approval_status_id = assetstasiunequipment.approval_status_id;
    this.enable = assetstasiunequipment.enable;
};

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'assetstasiunequipment';
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

AssetStasiunEquipment.create = async(newAssetStasiunEquipment, result) => {
	try {
		newAssetStasiunEquipment = setActivity(newAssetStasiunEquipment);
		const res = await query("INSERT INTO asset_stasiun_equipment SET ?", newAssetStasiunEquipment);
		objek.koneksi = res.insertId;
		await query("INSERT INTO activity_log SET ?", objek);
		result(null, { id: res.insertId, ...newAssetStasiunEquipment });
	} catch (error) {
	    result(error, null);
	}
};

AssetStasiunEquipment.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_stasiun_equipment WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found AssetStasiunEquipment with the id
        result({ kind: "not_found" }, null);
    });
};

AssetStasiunEquipment.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as tipe_asset, a2.nama as approval_status, a3.nama as ena FROM asset_stasiun_equipment a LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id ";
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

AssetStasiunEquipment.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'asset_stasiun_equipment'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

AssetStasiunEquipment.updateById = async(id, assetstasiunequipment, result) => {
	try {
		assetstasiunequipment = await setActivity(assetstasiunequipment, id);

		var str = "", obj = [], no = 1;
		for (var i in assetstasiunequipment) {
		    if (assetstasiunequipment[i]) {
		        str += i + " = ?, ";
		        obj.push(assetstasiunequipment[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("INSERT INTO activity_log SET ?", objek);
		await query("UPDATE asset_stasiun_equipment SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...assetstasiunequipment });
	} catch (error) {
	    result(error, null);
	}
};

AssetStasiunEquipment.remove = (id, result) => {
    sql.query("DELETE FROM asset_stasiun_equipment WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AssetStasiunEquipment with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = AssetStasiunEquipment;

