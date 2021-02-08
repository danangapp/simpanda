const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const AssetKapal = function (assetkapal) {
    this.simop_kd_fas = assetkapal.simop_kd_fas;
    this.kepemilikan_kapal = assetkapal.kepemilikan_kapal;
    this.simop_status_milik = assetkapal.simop_status_milik;
    this.simop_kd_agen = assetkapal.simop_kd_agen;
    this.tipe_asset_id = assetkapal.tipe_asset_id;
    this.nama_asset = assetkapal.nama_asset;
    this.horse_power = assetkapal.horse_power;
    this.tahun_perolehan = assetkapal.tahun_perolehan;
    this.nilai_perolehan = assetkapal.nilai_perolehan;
    this.lokasi = assetkapal.lokasi;
    this.enable = assetkapal.enable;
    this.asset_number = assetkapal.asset_number;
    this.simop_kd_puspel_jai = assetkapal.simop_kd_puspel_jai;
    this.simop_new_puspel_jai = assetkapal.simop_new_puspel_jai;
    this.simop_new_asset_jai = assetkapal.simop_new_asset_jai;
    this.approval_status_id = assetkapal.approval_status_id;
    this.loa = assetkapal.loa;
    this.tahun_pembuatan = assetkapal.tahun_pembuatan;
    this.breadth = assetkapal.breadth;
    this.kontruksi = assetkapal.kontruksi;
    this.depth = assetkapal.depth;
    this.negara_pembuat = assetkapal.negara_pembuat;
    this.draft_max = assetkapal.draft_max;
    this.daya = assetkapal.daya;
    this.putaran = assetkapal.putaran;
    this.merk = assetkapal.merk;
    this.tipe = assetkapal.tipe;
    this.daya_motor = assetkapal.daya_motor;
    this.daya_generator = assetkapal.daya_generator;
    this.putaran_spesifikasi = assetkapal.putaran_spesifikasi;
    this.merk_spesifikasi = assetkapal.merk_spesifikasi;
    this.tipe_spesifikasi = assetkapal.tipe_spesifikasi;
    this.klas = assetkapal.klas;
    this.notasi_permesinan = assetkapal.notasi_permesinan;
    this.no_registrasi = assetkapal.no_registrasi;
    this.notasi_perlengkapan = assetkapal.notasi_perlengkapan;
    this.port_of_registration = assetkapal.port_of_registration;
    this.notasi_perairan = assetkapal.notasi_perairan;
    this.notasi_lambung = assetkapal.notasi_lambung;
    this.gross_tonnage = assetkapal.gross_tonnage;
    this.bolard_pull = assetkapal.bolard_pull;
    this.kecepatan = assetkapal.kecepatan;
    this.ship_particular = assetkapal.ship_particular;
    this.sertifikat = assetkapal.sertifikat;
    this.date = assetkapal.date;
    this.item = assetkapal.item;
    this.action = assetkapal.action;
    this.user_id = assetkapal.user_id;
    this.remark = assetkapal.remark;
    this.koneksi = assetkapal.koneksi;
};

AssetKapal.create = async(newAssetKapal, result) => {
	try {
		const sertifikat = newAssetKapal.sertifikat;
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
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		}

		delete newAssetKapal.sertifikat;

		var obj = new Object();
		obj.date = newAssetKapal.date;
		obj.item = newAssetKapal.item;
		obj.action = newAssetKapal.action;
		obj.user_id = newAssetKapal.user_id;
		obj.remark = newAssetKapal.remark;
		obj.koneksi = newAssetKapal.koneksi;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newAssetKapal.date;
		delete newAssetKapal.item;
		delete newAssetKapal.action;
		delete newAssetKapal.user_id;
		delete newAssetKapal.remark;
		delete newAssetKapal.koneksi;

		const res = await query("INSERT INTO asset_kapal SET ?", newAssetKapal);
		result(null, { id: res.insertId, ...newAssetKapal });
	} catch (error) {
	    result(error, null);
	}
};

AssetKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found AssetKapal with the id
        result({ kind: "not_found" }, null);
    });
};

AssetKapal.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as tipe_asset, a2.nama as ena, a3.nama as approval_status FROM asset_kapal a LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN approval_status a3 ON a.approval_status_id = a3.id ";
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

AssetKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'asset_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

AssetKapal.updateById = async(id, assetkapal, result) => {
	try {
		const sertifikat = assetkapal.sertifikat;
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
		delete assetkapal.sertifikat;

		var obj = new Object();
		obj.date = AssetKapal.date;
		obj.item = AssetKapal.item;
		obj.action = AssetKapal.action;
		obj.user_id = AssetKapal.user_id;
		obj.remark = AssetKapal.remark;
		obj.koneksi = AssetKapal.koneksi;
		await query("INSERT INTO activity_log SET ?", obj);
		delete AssetKapal.date;
		delete AssetKapal.item;
		delete AssetKapal.action;
		delete AssetKapal.user_id;
		delete AssetKapal.remark;
		delete AssetKapal.koneksi;


		var str = "", obj = [], no = 1;
		for (var i in assetkapal) {
		    if (assetkapal[i]) {
		        str += i + " = ?, ";
		        obj.push(assetkapal[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE asset_kapal SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...assetkapal });
	} catch (error) {
	    result(error, null);
	}
};

AssetKapal.remove = (id, result) => {
    sql.query("DELETE FROM asset_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AssetKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = AssetKapal;

