const sql = require("../config/db.js");

// constructor
const Personil = function (personil) {
    this.tipe_personil = personil.tipe_personil;
    this.approval_status = personil.approval_status;
    this.simop_KD_PERS_PANDU = personil.simop_KD_PERS_PANDU;
    this.simop_KD_PERS_PANDU_CBG = personil.simop_KD_PERS_PANDU_CBG;
    this.enable = personil.enable;
    this.kapal = personil.kapal;
    this.nama = personil.nama;
    this.kelas = personil.kelas;
    this.tempat_lahir = personil.tempat_lahir;
    this.tanggal_lahir = personil.tanggal_lahir;
    this.nipp = personil.nipp;
    this.jabatan = personil.jabatan;
    this.status_kepegawaian = personil.status_kepegawaian;
    this.cv = personil.cv;
    this.tempat_tugas = personil.tempat_tugas;
    this.nomor_sk = personil.nomor_sk;
    this.tanggal_mulai = personil.tanggal_mulai;
    this.tanggal_selesai = personil.tanggal_selesai;
    this.sk = personil.sk;
    this.skpp = personil.skpp;
    this.surat_kesehatan = personil.surat_kesehatan;
    this.sertifikat_id = personil.sertifikat_id;
};

Personil.create = (newPersonil, result) => {
    sql.query("INSERT INTO personil SET ?", newPersonil, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created personil: ", { id: res.insertId, ...newPersonil });
        result(null, { id: res.insertId, ...newPersonil });
    });
};

Personil.findById = (id, result) => {
    sql.query(`SELECT * FROM personil WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found personil: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Personil with the id
        result({ kind: "not_found" }, null);
    });
};

Personil.getAll = result => {
    sql.query("SELECT * FROM personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("personil: ", res);
        result(null, res);
    });
};

Personil.updateById = (id, personil, result) => {
    sql.query(
        "UPDATE personil SET  tipe_personil = ?, approval_status = ?, simop_KD_PERS_PANDU = ?, simop_KD_PERS_PANDU_CBG = ?, enable = ?, kapal = ?, nama = ?, kelas = ?, tempat_lahir = ?, tanggal_lahir = ?, nipp = ?, jabatan = ?, status_kepegawaian = ?, cv = ?, tempat_tugas = ?, nomor_sk = ?, tanggal_mulai = ?, tanggal_selesai = ?, sk = ?, skpp = ?, surat_kesehatan = ?, sertifikat_id = ? WHERE id = ?",
        [personil.tipe_personil, personil.approval_status, personil.simop_KD_PERS_PANDU, personil.simop_KD_PERS_PANDU_CBG, personil.enable, personil.kapal, personil.nama, personil.kelas, personil.tempat_lahir, personil.tanggal_lahir, personil.nipp, personil.jabatan, personil.status_kepegawaian, personil.cv, personil.tempat_tugas, personil.nomor_sk, personil.tanggal_mulai, personil.tanggal_selesai, personil.sk, personil.skpp, personil.surat_kesehatan, personil.sertifikat_id, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Personil with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated personil: ", { id: id, ...personil });
            result(null, { id: id, ...personil });
        }
    );
};

Personil.remove = (id, result) => {
    sql.query("DELETE FROM personil WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Personil with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted personil with id: ", id);
        result(null, res);
    });
};

Personil.removeAll = result => {
    sql.query("DELETE FROM personil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} personil`);
        result(null, res);
    });
};

module.exports = Personil;

