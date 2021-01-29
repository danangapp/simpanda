const sql = require("../config/db.js");

// constructor
const AssetKapal = function (assetkapal) {
    this.simop_KD_FAS = assetkapal.simop_KD_FAS;
    this.kepemilikan_kapal = assetkapal.kepemilikan_kapal;
    this.simop_STATUS_MILIK = assetkapal.simop_STATUS_MILIK;
    this.simop_KD_AGEN = assetkapal.simop_KD_AGEN;
    this.jenis_kapal = assetkapal.jenis_kapal;
    this.nama_asset = assetkapal.nama_asset;
    this.horse_power = assetkapal.horse_power;
    this.tahun_perolehan = assetkapal.tahun_perolehan;
    this.nilai_perolehan = assetkapal.nilai_perolehan;
    this.lokasi = assetkapal.lokasi;
    this.enable = assetkapal.enable;
    this.asset_number = assetkapal.asset_number;
    this.simop_KD_PUSPEL_JAI = assetkapal.simop_KD_PUSPEL_JAI;
    this.simop_NEW_PUSPEL_JAI = assetkapal.simop_NEW_PUSPEL_JAI;
    this.simop_NEW_ASSET_JSI = assetkapal.simop_NEW_ASSET_JSI;
    this.approval_status = assetkapal.approval_status;
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
    this.nolard_pull = assetkapal.nolard_pull;
    this.kecepatan = assetkapal.kecepatan;
    this.ship_particular = assetkapal.ship_particular;
    this.sertifikat_id = assetkapal.sertifikat_id;
};

AssetKapal.create = (newAssetKapal, result) => {
    sql.query("INSERT INTO asset_kapal SET ?", newAssetKapal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created assetkapal: ", { id: res.insertId, ...newAssetKapal });
        result(null, { id: res.insertId, ...newAssetKapal });
    });
};

AssetKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM asset_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found assetkapal: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found AssetKapal with the id
        result({ kind: "not_found" }, null);
    });
};

AssetKapal.getAll = result => {
    sql.query("SELECT * FROM asset_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("assetkapal: ", res);
        result(null, res);
    });
};

AssetKapal.updateById = (id, assetkapal, result) => {
    sql.query(
        "UPDATE asset_kapal SET  simop_KD_FAS = ?, kepemilikan_kapal = ?, simop_STATUS_MILIK = ?, simop_KD_AGEN = ?, jenis_kapal = ?, nama_asset = ?, horse_power = ?, tahun_perolehan = ?, nilai_perolehan = ?, lokasi = ?, enable = ?, asset_number = ?, simop_KD_PUSPEL_JAI = ?, simop_NEW_PUSPEL_JAI = ?, simop_NEW_ASSET_JSI = ?, approval_status = ?, loa = ?, tahun_pembuatan = ?, breadth = ?, kontruksi = ?, depth = ?, negara_pembuat = ?, draft_max = ?, daya = ?, putaran = ?, merk = ?, tipe = ?, daya_motor = ?, daya_generator = ?, putaran_spesifikasi = ?, merk_spesifikasi = ?, tipe_spesifikasi = ?, klas = ?, notasi_permesinan = ?, no_registrasi = ?, notasi_perlengkapan = ?, port_of_registration = ?, notasi_perairan = ?, notasi_lambung = ?, gross_tonnage = ?, nolard_pull = ?, kecepatan = ?, ship_particular = ?, sertifikat_id = ? WHERE id = ?",
        [assetkapal.simop_KD_FAS, assetkapal.kepemilikan_kapal, assetkapal.simop_STATUS_MILIK, assetkapal.simop_KD_AGEN, assetkapal.jenis_kapal, assetkapal.nama_asset, assetkapal.horse_power, assetkapal.tahun_perolehan, assetkapal.nilai_perolehan, assetkapal.lokasi, assetkapal.enable, assetkapal.asset_number, assetkapal.simop_KD_PUSPEL_JAI, assetkapal.simop_NEW_PUSPEL_JAI, assetkapal.simop_NEW_ASSET_JSI, assetkapal.approval_status, assetkapal.loa, assetkapal.tahun_pembuatan, assetkapal.breadth, assetkapal.kontruksi, assetkapal.depth, assetkapal.negara_pembuat, assetkapal.draft_max, assetkapal.daya, assetkapal.putaran, assetkapal.merk, assetkapal.tipe, assetkapal.daya_motor, assetkapal.daya_generator, assetkapal.putaran_spesifikasi, assetkapal.merk_spesifikasi, assetkapal.tipe_spesifikasi, assetkapal.klas, assetkapal.notasi_permesinan, assetkapal.no_registrasi, assetkapal.notasi_perlengkapan, assetkapal.port_of_registration, assetkapal.notasi_perairan, assetkapal.notasi_lambung, assetkapal.gross_tonnage, assetkapal.nolard_pull, assetkapal.kecepatan, assetkapal.ship_particular, assetkapal.sertifikat_id, id],
        (err, res) => {
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

            console.log("updated assetkapal: ", { id: id, ...assetkapal });
            result(null, { id: id, ...assetkapal });
        }
    );
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

        console.log("deleted assetkapal with id: ", id);
        result(null, res);
    });
};

AssetKapal.removeAll = result => {
    sql.query("DELETE FROM asset_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} assetkapal`);
        result(null, res);
    });
};

module.exports = AssetKapal;

