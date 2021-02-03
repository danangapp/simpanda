const sql = require("../config/db.js");

// constructor
const AssetStasiunEquipment = function (assetstasiunequipment) {
    this.nomor_asset = assetstasiunequipment.nomor_asset;
    this.tipe_stasiun_id = assetstasiunequipment.tipe_stasiun_id;
    this.nama = assetstasiunequipment.nama;
    this.tahun_perolehan = assetstasiunequipment.tahun_perolehan;
    this.nilai_perolehan = assetstasiunequipment.nilai_perolehan;
    this.kondisi = assetstasiunequipment.kondisi;
    this.approval_status_id = assetstasiunequipment.approval_status_id;
};

AssetStasiunEquipment.create = (newAssetStasiunEquipment, result) => {
    sql.query("INSERT INTO asset_stasiun_equipment SET ?", newAssetStasiunEquipment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created assetstasiunequipment: ", { id: res.insertId, ...newAssetStasiunEquipment });
        result(null, { id: res.insertId, ...newAssetStasiunEquipment });
    });
};

AssetStasiunEquipment.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_stasiun_equipment WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found assetstasiunequipment: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found AssetStasiunEquipment with the id
        result({ kind: "not_found" }, null);
    });
};

AssetStasiunEquipment.getAll = result => {
    sql.query("SELECT * FROM asset_stasiun_equipment", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("assetstasiunequipment: ", res);
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

        console.log("assetstasiunequipment: ", res);
        result(null, res);
    });
};

AssetStasiunEquipment.updateById = (id, assetstasiunequipment, result) => {
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

    sql.query(
        "UPDATE asset_stasiun_equipment SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
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

            result(null, { id: id, ...assetstasiunequipment });
        }
    );
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

        console.log("deleted assetstasiunequipment with id: ", id);
        result(null, res);
    });
};

AssetStasiunEquipment.removeAll = result => {
    sql.query("DELETE FROM asset_stasiun_equipment", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} assetstasiunequipment`);
        result(null, res);
    });
};

module.exports = AssetStasiunEquipment;

