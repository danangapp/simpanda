const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const AssetStasiunEquipment2 = function (assetstasiunequipment2) {
    this.nomor_asset = assetstasiunequipment2.nomor_asset;
    this.tipe_stasiun_id = assetstasiunequipment2.tipe_stasiun_id;
    this.nama = assetstasiunequipment2.nama;
    this.tahun_perolehan = assetstasiunequipment2.tahun_perolehan;
    this.nilai_perolehan = assetstasiunequipment2.nilai_perolehan;
    this.kondisi = assetstasiunequipment2.kondisi;
    this.approval_status_id = assetstasiunequipment2.approval_status_id;
    this.enable = assetstasiunequipment2.enable;
};

AssetStasiunEquipment2.create = async(newAssetStasiunEquipment2, result) => {
	try {
		var obj = new Object();
		obj.date = newAssetStasiunEquipment2.date;
		obj.item = newAssetStasiunEquipment2.item;
		obj.action = newAssetStasiunEquipment2.action;
		obj.user_id = newAssetStasiunEquipment2.user_id;
		obj.remark = newAssetStasiunEquipment2.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newAssetStasiunEquipment2.date;
		delete newAssetStasiunEquipment2.item;
		delete newAssetStasiunEquipment2.action;
		delete newAssetStasiunEquipment2.user_id;
		delete newAssetStasiunEquipment2.remark;

		const res = await query("INSERT INTO asset_stasiun_equipment2 SET ?", newAssetStasiunEquipment2);
		result(null, { id: res.insertId, ...newAssetStasiunEquipment2 });
	} catch (error) {
	    result(error, null);
	}
};

AssetStasiunEquipment2.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_stasiun_equipment2 WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found AssetStasiunEquipment2 with the id
        result({ kind: "not_found" }, null);
    });
};

AssetStasiunEquipment2.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as tipe_stasiun, a2.nama as approval_status, a3.nama as enable FROM asset_stasiun_equipment2 a LEFT JOIN tipe_stasiun a1 ON a.tipe_stasiun_id = a1.id  LEFT JOIN approval_status a2 ON a.approval_status_id = a2.id  LEFT JOIN enable a3 ON a.enable = a3.id ";
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

AssetStasiunEquipment2.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'asset_stasiun_equipment2'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

AssetStasiunEquipment2.updateById = async(id, assetstasiunequipment2, result) => {
	try {
		var obj = new Object();
		obj.date = AssetStasiunEquipment2.date;
		obj.item = AssetStasiunEquipment2.item;
		obj.action = AssetStasiunEquipment2.action;
		obj.user_id = AssetStasiunEquipment2.user_id;
		obj.remark = AssetStasiunEquipment2.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete AssetStasiunEquipment2.date;
		delete AssetStasiunEquipment2.item;
		delete AssetStasiunEquipment2.action;
		delete AssetStasiunEquipment2.user_id;
		delete AssetStasiunEquipment2.remark;


		var str = "", obj = [], no = 1;
		for (var i in assetstasiunequipment2) {
		    if (assetstasiunequipment2[i]) {
		        str += i + " = ?, ";
		        obj.push(assetstasiunequipment2[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE asset_stasiun_equipment2 SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...assetstasiunequipment2 });
	} catch (error) {
	    result(error, null);
	}
};

AssetStasiunEquipment2.remove = (id, result) => {
    sql.query("DELETE FROM asset_stasiun_equipment2 WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AssetStasiunEquipment2 with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = AssetStasiunEquipment2;

