const sql = require("../config/db.js");

// constructor
const EvaluasiPelimpahan = function (evaluasipelimpahan) {
    this.approval_status_id = evaluasipelimpahan.approval_status_id;
    this.cabang_id = evaluasipelimpahan.cabang_id;
    this.bup = evaluasipelimpahan.bup;
    this.izin_bup = evaluasipelimpahan.izin_bup;
    this.penetapan_perairan_pandu = evaluasipelimpahan.penetapan_perairan_pandu;
    this.izin_pelimpahan = evaluasipelimpahan.izin_pelimpahan;
    this.pengawas_pemanduan = evaluasipelimpahan.pengawas_pemanduan;
    this.laporan_bulanan = evaluasipelimpahan.laporan_bulanan;
    this.bukti_pembayaran_pnpb = evaluasipelimpahan.bukti_pembayaran_pnpb;
    this.sispro = evaluasipelimpahan.sispro;
    this.tarif_jasa_pandu_tunda = evaluasipelimpahan.tarif_jasa_pandu_tunda;
    this.data_dukung = evaluasipelimpahan.data_dukung;
    this.dile_pendukung = evaluasipelimpahan.dile_pendukung;
    this.tanggal_sk = evaluasipelimpahan.tanggal_sk;
    this.file_sk_pelimpahan = evaluasipelimpahan.file_sk_pelimpahan;
};

EvaluasiPelimpahan.create = (newEvaluasiPelimpahan, result) => {
    sql.query("INSERT INTO evaluasi_pelimpahan SET ?", newEvaluasiPelimpahan, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created evaluasipelimpahan: ", { id: res.insertId, ...newEvaluasiPelimpahan });
        result(null, { id: res.insertId, ...newEvaluasiPelimpahan });
    });
};

EvaluasiPelimpahan.findById = (id, result) => {
    sql.query(`SELECT * FROM evaluasi_pelimpahan WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found evaluasipelimpahan: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found EvaluasiPelimpahan with the id
        result({ kind: "not_found" }, null);
    });
};

EvaluasiPelimpahan.getAll = result => {
    sql.query("SELECT * FROM evaluasi_pelimpahan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("evaluasipelimpahan: ", res);
        result(null, res);
    });
};

EvaluasiPelimpahan.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'evaluasi_pelimpahan'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("evaluasipelimpahan: ", res);
        result(null, res);
    });
};

EvaluasiPelimpahan.updateById = (id, evaluasipelimpahan, result) => {
    sql.query(
        "UPDATE evaluasi_pelimpahan SET  approval_status_id = ?, cabang_id = ?, bup = ?, izin_bup = ?, penetapan_perairan_pandu = ?, izin_pelimpahan = ?, pengawas_pemanduan = ?, laporan_bulanan = ?, bukti_pembayaran_pnpb = ?, sispro = ?, tarif_jasa_pandu_tunda = ?, data_dukung = ?, dile_pendukung = ?, tanggal_sk = ?, file_sk_pelimpahan = ? WHERE id = ?",
        [evaluasipelimpahan.approval_status_id, evaluasipelimpahan.cabang_id, evaluasipelimpahan.bup, evaluasipelimpahan.izin_bup, evaluasipelimpahan.penetapan_perairan_pandu, evaluasipelimpahan.izin_pelimpahan, evaluasipelimpahan.pengawas_pemanduan, evaluasipelimpahan.laporan_bulanan, evaluasipelimpahan.bukti_pembayaran_pnpb, evaluasipelimpahan.sispro, evaluasipelimpahan.tarif_jasa_pandu_tunda, evaluasipelimpahan.data_dukung, evaluasipelimpahan.dile_pendukung, evaluasipelimpahan.tanggal_sk, evaluasipelimpahan.file_sk_pelimpahan, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found EvaluasiPelimpahan with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated evaluasipelimpahan: ", { id: id, ...evaluasipelimpahan });
            result(null, { id: id, ...evaluasipelimpahan });
        }
    );
};

EvaluasiPelimpahan.remove = (id, result) => {
    sql.query("DELETE FROM evaluasi_pelimpahan WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found EvaluasiPelimpahan with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted evaluasipelimpahan with id: ", id);
        result(null, res);
    });
};

EvaluasiPelimpahan.removeAll = result => {
    sql.query("DELETE FROM evaluasi_pelimpahan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} evaluasipelimpahan`);
        result(null, res);
    });
};

module.exports = EvaluasiPelimpahan;

