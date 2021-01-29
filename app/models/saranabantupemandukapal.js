const sql = require("../config/db.js");

// constructor
const SaranaBantuPemanduKapal = function (saranabantupemandukapal) {
    this.SARANA_BANTU_PEMANDU_id = saranabantupemandukapal.SARANA_BANTU_PEMANDU_id;
    this.tipe = saranabantupemandukapal.tipe;
    this.dokumen_kapal_q1 = saranabantupemandukapal.dokumen_kapal_q1;
    this.dokumen_kapal_q2 = saranabantupemandukapal.dokumen_kapal_q2;
    this.dokumen_kapal_q3 = saranabantupemandukapal.dokumen_kapal_q3;
    this.dokumen_kapal_q4 = saranabantupemandukapal.dokumen_kapal_q4;
    this.dokumen_kapal_q5 = saranabantupemandukapal.dokumen_kapal_q5;
    this.dokumen_kapal_q6 = saranabantupemandukapal.dokumen_kapal_q6;
    this.dokumen_kapal_q7 = saranabantupemandukapal.dokumen_kapal_q7;
    this.dokumen_kapal_q8 = saranabantupemandukapal.dokumen_kapal_q8;
    this.dokumen_kapal_q9 = saranabantupemandukapal.dokumen_kapal_q9;
    this.dokumen_kapal_q10 = saranabantupemandukapal.dokumen_kapal_q10;
    this.dokumen_kapal_q11 = saranabantupemandukapal.dokumen_kapal_q11;
    this.dokumen_kapal_q12 = saranabantupemandukapal.dokumen_kapal_q12;
    this.dokumen_kapal_q13 = saranabantupemandukapal.dokumen_kapal_q13;
    this.dokumen_kapal_q14 = saranabantupemandukapal.dokumen_kapal_q14;
    this.dokumen_kapal_q15 = saranabantupemandukapal.dokumen_kapal_q15;
    this.kondisi_umum_q1 = saranabantupemandukapal.kondisi_umum_q1;
    this.kondisi_umum_q2 = saranabantupemandukapal.kondisi_umum_q2;
    this.kondisi_umum_q3 = saranabantupemandukapal.kondisi_umum_q3;
    this.kondisi_umum_q4 = saranabantupemandukapal.kondisi_umum_q4;
    this.kondisi_umum_q5 = saranabantupemandukapal.kondisi_umum_q5;
    this.kondisi_umum_q6 = saranabantupemandukapal.kondisi_umum_q6;
    this.pemeriksaan_performa_q1 = saranabantupemandukapal.pemeriksaan_performa_q1;
    this.pemeriksaan_performa_q2 = saranabantupemandukapal.pemeriksaan_performa_q2;
    this.pemeriksaan_performa_q3 = saranabantupemandukapal.pemeriksaan_performa_q3;
    this.pemeriksaan_performa_q4 = saranabantupemandukapal.pemeriksaan_performa_q4;
    this.pemeriksaan_performa_q5 = saranabantupemandukapal.pemeriksaan_performa_q5;
    this.pemeriksaan_fisik_a1 = saranabantupemandukapal.pemeriksaan_fisik_a1;
    this.pemeriksaan_fisik_a2 = saranabantupemandukapal.pemeriksaan_fisik_a2;
    this.pemeriksaan_fisik_a3 = saranabantupemandukapal.pemeriksaan_fisik_a3;
    this.pemeriksaan_fisik_a4 = saranabantupemandukapal.pemeriksaan_fisik_a4;
    this.pemeriksaan_fisik_a5 = saranabantupemandukapal.pemeriksaan_fisik_a5;
    this.pemeriksaan_fisik_a6 = saranabantupemandukapal.pemeriksaan_fisik_a6;
    this.pemeriksaan_fisik_a7 = saranabantupemandukapal.pemeriksaan_fisik_a7;
    this.pemeriksaan_fisik_b1 = saranabantupemandukapal.pemeriksaan_fisik_b1;
    this.pemeriksaan_fisik_b2 = saranabantupemandukapal.pemeriksaan_fisik_b2;
    this.pemeriksaan_fisik_b3 = saranabantupemandukapal.pemeriksaan_fisik_b3;
    this.pemeriksaan_fisik_b4 = saranabantupemandukapal.pemeriksaan_fisik_b4;
    this.pemeriksaan_fisik_b5 = saranabantupemandukapal.pemeriksaan_fisik_b5;
    this.pemeriksaan_fisik_b6 = saranabantupemandukapal.pemeriksaan_fisik_b6;
    this.pemeriksaan_fisik_b7 = saranabantupemandukapal.pemeriksaan_fisik_b7;
    this.pemeriksaan_fisik_b8 = saranabantupemandukapal.pemeriksaan_fisik_b8;
    this.pemeriksaan_fisik_b9 = saranabantupemandukapal.pemeriksaan_fisik_b9;
    this.pemeriksaan_fisik_c1 = saranabantupemandukapal.pemeriksaan_fisik_c1;
    this.pemeriksaan_fisik_c2 = saranabantupemandukapal.pemeriksaan_fisik_c2;
    this.pemeriksaan_fisik_c3 = saranabantupemandukapal.pemeriksaan_fisik_c3;
    this.pemeriksaan_fisik_c4 = saranabantupemandukapal.pemeriksaan_fisik_c4;
    this.pemeriksaan_fisik_c5 = saranabantupemandukapal.pemeriksaan_fisik_c5;
    this.pemeriksaan_fisik_c6 = saranabantupemandukapal.pemeriksaan_fisik_c6;
    this.pemeriksaan_fisik_c7 = saranabantupemandukapal.pemeriksaan_fisik_c7;
    this.pemeriksaan_fisik_d1 = saranabantupemandukapal.pemeriksaan_fisik_d1;
    this.pemeriksaan_fisik_d2 = saranabantupemandukapal.pemeriksaan_fisik_d2;
    this.pemeriksaan_fisik_d3 = saranabantupemandukapal.pemeriksaan_fisik_d3;
    this.pemeriksaan_fisik_d4 = saranabantupemandukapal.pemeriksaan_fisik_d4;
    this.pemeriksaan_fisik_d5 = saranabantupemandukapal.pemeriksaan_fisik_d5;
    this.pemeriksaan_fisik_d6 = saranabantupemandukapal.pemeriksaan_fisik_d6;
    this.pemeriksaan_fisik_d7 = saranabantupemandukapal.pemeriksaan_fisik_d7;
    this.pemeriksaan_fisik_d8 = saranabantupemandukapal.pemeriksaan_fisik_d8;
    this.pemeriksaan_fisik_d9 = saranabantupemandukapal.pemeriksaan_fisik_d9;
    this.pemeriksaan_fisik_e1 = saranabantupemandukapal.pemeriksaan_fisik_e1;
    this.pemeriksaan_fisik_e2 = saranabantupemandukapal.pemeriksaan_fisik_e2;
    this.pemeriksaan_fisik_e3 = saranabantupemandukapal.pemeriksaan_fisik_e3;
    this.pemeriksaan_fisik_f1 = saranabantupemandukapal.pemeriksaan_fisik_f1;
    this.pemeriksaan_fisik_f2 = saranabantupemandukapal.pemeriksaan_fisik_f2;
    this.pemeriksaan_fisik_f3 = saranabantupemandukapal.pemeriksaan_fisik_f3;
    this.pemeriksaan_fisik_f4 = saranabantupemandukapal.pemeriksaan_fisik_f4;
};

SaranaBantuPemanduKapal.create = (newSaranaBantuPemanduKapal, result) => {
    sql.query("INSERT INTO sarana_bantu_pemandu_kapal SET ?", newSaranaBantuPemanduKapal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created saranabantupemandukapal: ", { id: res.insertId, ...newSaranaBantuPemanduKapal });
        result(null, { id: res.insertId, ...newSaranaBantuPemanduKapal });
    });
};

SaranaBantuPemanduKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM sarana_bantu_pemandu_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found saranabantupemandukapal: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemanduKapal with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemanduKapal.getAll = result => {
    sql.query("SELECT * FROM sarana_bantu_pemandu_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("saranabantupemandukapal: ", res);
        result(null, res);
    });
};

SaranaBantuPemanduKapal.updateById = (id, saranabantupemandukapal, result) => {
    sql.query(
        "UPDATE sarana_bantu_pemandu_kapal SET  SARANA_BANTU_PEMANDU_id = ?, tipe = ?, dokumen_kapal_q1 = ?, dokumen_kapal_q2 = ?, dokumen_kapal_q3 = ?, dokumen_kapal_q4 = ?, dokumen_kapal_q5 = ?, dokumen_kapal_q6 = ?, dokumen_kapal_q7 = ?, dokumen_kapal_q8 = ?, dokumen_kapal_q9 = ?, dokumen_kapal_q10 = ?, dokumen_kapal_q11 = ?, dokumen_kapal_q12 = ?, dokumen_kapal_q13 = ?, dokumen_kapal_q14 = ?, dokumen_kapal_q15 = ?, kondisi_umum_q1 = ?, kondisi_umum_q2 = ?, kondisi_umum_q3 = ?, kondisi_umum_q4 = ?, kondisi_umum_q5 = ?, kondisi_umum_q6 = ?, pemeriksaan_performa_q1 = ?, pemeriksaan_performa_q2 = ?, pemeriksaan_performa_q3 = ?, pemeriksaan_performa_q4 = ?, pemeriksaan_performa_q5 = ?, pemeriksaan_fisik_a1 = ?, pemeriksaan_fisik_a2 = ?, pemeriksaan_fisik_a3 = ?, pemeriksaan_fisik_a4 = ?, pemeriksaan_fisik_a5 = ?, pemeriksaan_fisik_a6 = ?, pemeriksaan_fisik_a7 = ?, pemeriksaan_fisik_b1 = ?, pemeriksaan_fisik_b2 = ?, pemeriksaan_fisik_b3 = ?, pemeriksaan_fisik_b4 = ?, pemeriksaan_fisik_b5 = ?, pemeriksaan_fisik_b6 = ?, pemeriksaan_fisik_b7 = ?, pemeriksaan_fisik_b8 = ?, pemeriksaan_fisik_b9 = ?, pemeriksaan_fisik_c1 = ?, pemeriksaan_fisik_c2 = ?, pemeriksaan_fisik_c3 = ?, pemeriksaan_fisik_c4 = ?, pemeriksaan_fisik_c5 = ?, pemeriksaan_fisik_c6 = ?, pemeriksaan_fisik_c7 = ?, pemeriksaan_fisik_d1 = ?, pemeriksaan_fisik_d2 = ?, pemeriksaan_fisik_d3 = ?, pemeriksaan_fisik_d4 = ?, pemeriksaan_fisik_d5 = ?, pemeriksaan_fisik_d6 = ?, pemeriksaan_fisik_d7 = ?, pemeriksaan_fisik_d8 = ?, pemeriksaan_fisik_d9 = ?, pemeriksaan_fisik_e1 = ?, pemeriksaan_fisik_e2 = ?, pemeriksaan_fisik_e3 = ?, pemeriksaan_fisik_f1 = ?, pemeriksaan_fisik_f2 = ?, pemeriksaan_fisik_f3 = ?, pemeriksaan_fisik_f4 = ? WHERE id = ?",
        [saranabantupemandukapal.SARANA_BANTU_PEMANDU_id, saranabantupemandukapal.tipe, saranabantupemandukapal.dokumen_kapal_q1, saranabantupemandukapal.dokumen_kapal_q2, saranabantupemandukapal.dokumen_kapal_q3, saranabantupemandukapal.dokumen_kapal_q4, saranabantupemandukapal.dokumen_kapal_q5, saranabantupemandukapal.dokumen_kapal_q6, saranabantupemandukapal.dokumen_kapal_q7, saranabantupemandukapal.dokumen_kapal_q8, saranabantupemandukapal.dokumen_kapal_q9, saranabantupemandukapal.dokumen_kapal_q10, saranabantupemandukapal.dokumen_kapal_q11, saranabantupemandukapal.dokumen_kapal_q12, saranabantupemandukapal.dokumen_kapal_q13, saranabantupemandukapal.dokumen_kapal_q14, saranabantupemandukapal.dokumen_kapal_q15, saranabantupemandukapal.kondisi_umum_q1, saranabantupemandukapal.kondisi_umum_q2, saranabantupemandukapal.kondisi_umum_q3, saranabantupemandukapal.kondisi_umum_q4, saranabantupemandukapal.kondisi_umum_q5, saranabantupemandukapal.kondisi_umum_q6, saranabantupemandukapal.pemeriksaan_performa_q1, saranabantupemandukapal.pemeriksaan_performa_q2, saranabantupemandukapal.pemeriksaan_performa_q3, saranabantupemandukapal.pemeriksaan_performa_q4, saranabantupemandukapal.pemeriksaan_performa_q5, saranabantupemandukapal.pemeriksaan_fisik_a1, saranabantupemandukapal.pemeriksaan_fisik_a2, saranabantupemandukapal.pemeriksaan_fisik_a3, saranabantupemandukapal.pemeriksaan_fisik_a4, saranabantupemandukapal.pemeriksaan_fisik_a5, saranabantupemandukapal.pemeriksaan_fisik_a6, saranabantupemandukapal.pemeriksaan_fisik_a7, saranabantupemandukapal.pemeriksaan_fisik_b1, saranabantupemandukapal.pemeriksaan_fisik_b2, saranabantupemandukapal.pemeriksaan_fisik_b3, saranabantupemandukapal.pemeriksaan_fisik_b4, saranabantupemandukapal.pemeriksaan_fisik_b5, saranabantupemandukapal.pemeriksaan_fisik_b6, saranabantupemandukapal.pemeriksaan_fisik_b7, saranabantupemandukapal.pemeriksaan_fisik_b8, saranabantupemandukapal.pemeriksaan_fisik_b9, saranabantupemandukapal.pemeriksaan_fisik_c1, saranabantupemandukapal.pemeriksaan_fisik_c2, saranabantupemandukapal.pemeriksaan_fisik_c3, saranabantupemandukapal.pemeriksaan_fisik_c4, saranabantupemandukapal.pemeriksaan_fisik_c5, saranabantupemandukapal.pemeriksaan_fisik_c6, saranabantupemandukapal.pemeriksaan_fisik_c7, saranabantupemandukapal.pemeriksaan_fisik_d1, saranabantupemandukapal.pemeriksaan_fisik_d2, saranabantupemandukapal.pemeriksaan_fisik_d3, saranabantupemandukapal.pemeriksaan_fisik_d4, saranabantupemandukapal.pemeriksaan_fisik_d5, saranabantupemandukapal.pemeriksaan_fisik_d6, saranabantupemandukapal.pemeriksaan_fisik_d7, saranabantupemandukapal.pemeriksaan_fisik_d8, saranabantupemandukapal.pemeriksaan_fisik_d9, saranabantupemandukapal.pemeriksaan_fisik_e1, saranabantupemandukapal.pemeriksaan_fisik_e2, saranabantupemandukapal.pemeriksaan_fisik_e3, saranabantupemandukapal.pemeriksaan_fisik_f1, saranabantupemandukapal.pemeriksaan_fisik_f2, saranabantupemandukapal.pemeriksaan_fisik_f3, saranabantupemandukapal.pemeriksaan_fisik_f4, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SaranaBantuPemanduKapal with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated saranabantupemandukapal: ", { id: id, ...saranabantupemandukapal });
            result(null, { id: id, ...saranabantupemandukapal });
        }
    );
};

SaranaBantuPemanduKapal.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemanduKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted saranabantupemandukapal with id: ", id);
        result(null, res);
    });
};

SaranaBantuPemanduKapal.removeAll = result => {
    sql.query("DELETE FROM sarana_bantu_pemandu_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} saranabantupemandukapal`);
        result(null, res);
    });
};

module.exports = SaranaBantuPemanduKapal;

