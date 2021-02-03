const sql = require("../config/db.js");

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
};

AssetRumahDinas.create = (newAssetRumahDinas, result) => {
    sql.query("INSERT INTO asset_rumah_dinas SET ?", newAssetRumahDinas, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created assetrumahdinas: ", { id: res.insertId, ...newAssetRumahDinas });
        result(null, { id: res.insertId, ...newAssetRumahDinas });
    });
};

AssetRumahDinas.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_rumah_dinas WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found assetrumahdinas: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found AssetRumahDinas with the id
        result({ kind: "not_found" }, null);
    });
};

AssetRumahDinas.getAll = result => {
    sql.query("SELECT * FROM asset_rumah_dinas", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("assetrumahdinas: ", res);
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

        console.log("assetrumahdinas: ", res);
        result(null, res);
    });
};

AssetRumahDinas.updateById = (id, assetrumahdinas, result) => {
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

    sql.query(
        "UPDATE asset_rumah_dinas SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
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

            result(null, { id: id, ...assetrumahdinas });
        }
    );
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

        console.log("deleted assetrumahdinas with id: ", id);
        result(null, res);
    });
};

AssetRumahDinas.removeAll = result => {
    sql.query("DELETE FROM asset_rumah_dinas", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} assetrumahdinas`);
        result(null, res);
    });
};

module.exports = AssetRumahDinas;

