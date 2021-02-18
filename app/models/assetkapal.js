const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const AssetKapal = function (assetkapal) {
    this.simop_kd_fas = assetkapal.simop_kd_fas;
    this.kepemilikan_kapal = assetkapal.kepemilikan_kapal;
    this.simop_status_milik = assetkapal.simop_status_milik;
    this.simop_kd_agen = assetkapal.simop_kd_agen;
    this.jenis_kapal = assetkapal.jenis_kapal;
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

const setActivity = (objects, koneksi = 1) => {
		objek.date = f.toDate(objects.date);
		objek.item = 'assetkapal';
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

AssetKapal.create = async(newAssetKapal, result) => {
	try {
		const sertifikat = newAssetKapal.sertifikat;
		for (var i in sertifikat) {
		    const x = sertifikat[i];
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
				if (a != "sertifikat") {
				    value += "'" + val + "', ";
				} else {
				    var fileName = f.uploadFile64('asset_kapal', val);
				    value += "'" + fileName + "', ";
				}
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
			await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
		}

		delete newAssetKapal.sertifikat;
		newAssetKapal = setActivity(newAssetKapal);
		const res = await query("INSERT INTO asset_kapal SET ?", newAssetKapal);
		objek.koneksi = res.insertId;
		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		result(null, { id: res.insertId, ...newAssetKapal });
	} catch (error) {
	    result(error, null);
	}
};

AssetKapal.findById = (id, result) => {
    sql.query(`SELECT a.* , a1.nama as tipe_asset, a2.nama as ena, a3.nama as approval_status FROM asset_kapal a  LEFT JOIN tipe_asset a1 ON a.jenis_kapal = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN approval_status a3 ON a.approval_status_id = a3.id  WHERE a.id = ${id}`, (err, res) => {
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
    var wheres = "";
    var query = "SELECT a.* , a1.nama as tipe_asset, a2.nama as ena, a3.nama as approval_status FROM asset_kapal a  LEFT JOIN tipe_asset a1 ON a.jenis_kapal = a1.id  LEFT JOIN enable a2 ON a.enable = a2.id  LEFT JOIN approval_status a3 ON a.approval_status_id = a3.id ";
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
	wheres += "a.simop_kd_fas LIKE '%1234%' OR a.kepemilikan_kapal LIKE '%1234%' OR a.simop_status_milik LIKE '%1234%' OR a.simop_kd_agen LIKE '%1234%' OR a.jenis_kapal LIKE '%1234%' OR a.nama_asset LIKE '%1234%' OR a.horse_power LIKE '%1234%' OR a.tahun_perolehan LIKE '%1234%' OR a.nilai_perolehan LIKE '%1234%' OR a.lokasi LIKE '%1234%' OR a.enable LIKE '%1234%' OR a.asset_number LIKE '%1234%' OR a.simop_kd_puspel_jai LIKE '%1234%' OR a.simop_new_puspel_jai LIKE '%1234%' OR a.simop_new_asset_jai LIKE '%1234%' OR a.approval_status_id LIKE '%1234%' OR a.loa LIKE '%1234%' OR a.tahun_pembuatan LIKE '%1234%' OR a.breadth LIKE '%1234%' OR a.kontruksi LIKE '%1234%' OR a.depth LIKE '%1234%' OR a.negara_pembuat LIKE '%1234%' OR a.draft_max LIKE '%1234%' OR a.daya LIKE '%1234%' OR a.putaran LIKE '%1234%' OR a.merk LIKE '%1234%' OR a.tipe LIKE '%1234%' OR a.daya_motor LIKE '%1234%' OR a.daya_generator LIKE '%1234%' OR a.putaran_spesifikasi LIKE '%1234%' OR a.merk_spesifikasi LIKE '%1234%' OR a.tipe_spesifikasi LIKE '%1234%' OR a.klas LIKE '%1234%' OR a.notasi_permesinan LIKE '%1234%' OR a.no_registrasi LIKE '%1234%' OR a.notasi_perlengkapan LIKE '%1234%' OR a.port_of_registration LIKE '%1234%' OR a.notasi_perairan LIKE '%1234%' OR a.notasi_lambung LIKE '%1234%' OR a.gross_tonnage LIKE '%1234%' OR a.bolard_pull LIKE '%1234%' OR a.kecepatan LIKE '%1234%' OR a.ship_particular LIKE '%1234%' OR a.sertifikat_id LIKE '%1234%'";	
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
		assetkapal = await setActivity(assetkapal, id);

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

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
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

