const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const AssetStasiunEquipment = function (assetstasiunequipment) {
    this.nomor_asset = assetstasiunequipment.nomor_asset;
    this.tipe_stasiun_id = assetstasiunequipment.tipe_stasiun_id;
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
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newAssetStasiunEquipment });
	} catch (error) {
	    result(error, null);
	}
};

AssetStasiunEquipment.findById = async (id, result) => {
	const resActivityLog = await query("SELECT a.date, a.item, a.action, a.user_id, a.remark, a.koneksi FROM activity_log a INNER JOIN asset_stasiun_equipment b ON a.item = 'asset_stasiun_equipment' AND a.koneksi = b.id WHERE b.id =  '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as tipe_stasiun, a2.nama as approval_status, a3.nama as ena FROM asset_stasiun_equipment a  LEFT JOIN tipe_stasiun a1 ON a.tipe_stasiun_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

		const activityLog = { "activityLog": resActivityLog }
		let merge = { ...res[0], ...activityLog }	
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
    var wheres = "";
    var query = "SELECT a.* , a1.nama as tipe_stasiun, a2.nama as approval_status, a3.nama as ena FROM asset_stasiun_equipment a  LEFT JOIN tipe_stasiun a1 ON a.tipe_stasiun_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id ";
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
		wheres += "a.nomor_asset LIKE '%" + param.q + "%' OR a.tipe_stasiun_id LIKE '%" + param.q + "%' OR a.nama LIKE '%" + param.q + "%' OR a.tahun_perolehan LIKE '%" + param.q + "%' OR a.nilai_perolehan LIKE '%" + param.q + "%' OR a.kondisi LIKE '%" + param.q + "%' OR a.approval_status_id LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%'";	
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
		var arr = ["nomor_asset", "tipe_stasiun_id", "nama", "tahun_perolehan", "nilai_perolehan", "kondisi", "approval_status_id", "enable"];
		for (var i in assetstasiunequipment) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (assetstasiunequipment[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(assetstasiunequipment[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
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

