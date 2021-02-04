const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const Personil = function (personil) {
    this.tipe_personil_id = personil.tipe_personil_id;
    this.approval_status_id = personil.approval_status_id;
    this.simop_kd_pers_pandu = personil.simop_kd_pers_pandu;
    this.simop_kd_pers_pandu_cbg = personil.simop_kd_pers_pandu_cbg;
    this.enable = personil.enable;
    this.asset_kapal_id = personil.asset_kapal_id;
    this.nama = personil.nama;
    this.kelas = personil.kelas;
    this.tempat_lahir = personil.tempat_lahir;
    this.tanggal_lahir = personil.tanggal_lahir;
    this.nipp = personil.nipp;
    this.jabatan = personil.jabatan;
    this.status_kepegawaian_id = personil.status_kepegawaian_id;
    this.cv = personil.cv;
    this.tempat_tugas = personil.tempat_tugas;
    this.nomor_sk = personil.nomor_sk;
    this.tanggal_mulai = personil.tanggal_mulai;
    this.tanggal_selesai = personil.tanggal_selesai;
    this.sk = personil.sk;
    this.skpp = personil.skpp;
    this.surat_kesehatan = personil.surat_kesehatan;
    this.sertifikat_id = personil.sertifikat_id;
    this.sertifikat = personil.sertifikat;

    // console.log(personil);
};

Personil.create = async (newPersonil, result) => {
    const sertifikat = newPersonil.sertifikat;
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
        try {
            await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(newPersonil)    
    try {
        delete newPersonil.sertifikat;
        const execute = await query("INSERT INTO personil SET ?", newPersonil);
        result(null, { id: execute.insertId, ...newPersonil });
    } catch (error) {
        result(error, null);
    }
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

Personil.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM personil";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
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

        // console.log("personil: ", res);
        result(null, res);
    });
};

Personil.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'personil'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("personil: ", res);
        result(null, res);
    });
};

Personil.updateById = async (id, personil, result) => {

    const sertifikat = personil.sertifikat;
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

        try {
            await query("DELETE FROM sertifikat WHERE id = ?", x.id);
            await query("INSERT INTO sertifikat (" + header + ") values (" + value + ")");
        } catch (error) {
            console.log(error)
        }
    }

    try {
        delete personil.sertifikat;

        var str = "", obj = [], no = 1;
        for (var i in personil) {
            if (personil[i]) {
                str += i + " = ?, ";
                obj.push(personil[i]);
            }
            no++;
        }
        obj.push(id);
        str = str.substring(0, str.length - 2);

        await query("UPDATE personil SET " + str + " WHERE id = ?", obj);
        result(null, { id: id, ...personil });
    } catch (error) {
        console.log(error)
        result(error, null);
    }
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

