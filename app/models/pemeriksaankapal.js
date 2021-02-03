const sql = require("../config/db.js");

// constructor
const PemeriksaanKapal = function (pemeriksaankapal) {
    this.approval_status_id = pemeriksaankapal.approval_status_id;
    this.asset_kapal_id = pemeriksaankapal.asset_kapal_id;
    this.cabang = pemeriksaankapal.cabang;
    this.kondisi_id = pemeriksaankapal.kondisi_id;
    this.tanggal_awal = pemeriksaankapal.tanggal_awal;
    this.tanggal_akhir = pemeriksaankapal.tanggal_akhir;
    this.keterangan = pemeriksaankapal.keterangan;
};

PemeriksaanKapal.create = (newPemeriksaanKapal, result) => {
    sql.query("INSERT INTO pemeriksaan_kapal SET ?", newPemeriksaanKapal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created pemeriksaankapal: ", { id: res.insertId, ...newPemeriksaanKapal });
        result(null, { id: res.insertId, ...newPemeriksaanKapal });
    });
};

PemeriksaanKapal.findById = (id, result) => {
    sql.query(`SELECT * FROM pemeriksaan_kapal WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pemeriksaankapal: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found PemeriksaanKapal with the id
        result({ kind: "not_found" }, null);
    });
};

PemeriksaanKapal.getAll = result => {
    sql.query("SELECT * FROM pemeriksaan_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pemeriksaankapal: ", res);
        result(null, res);
    });
};

PemeriksaanKapal.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pemeriksaan_kapal'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pemeriksaankapal: ", res);
        result(null, res);
    });
};

PemeriksaanKapal.updateById = (id, pemeriksaankapal, result) => {
	var str = "", obj = [], no = 1;
	for (var i in pemeriksaankapal) {
	    if (pemeriksaankapal[i]) {
	        str += i + " = ?, ";
	        obj.push(pemeriksaankapal[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE pemeriksaan_kapal SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found PemeriksaanKapal with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...pemeriksaankapal });
        }
    );
};

PemeriksaanKapal.remove = (id, result) => {
    sql.query("DELETE FROM pemeriksaan_kapal WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PemeriksaanKapal with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted pemeriksaankapal with id: ", id);
        result(null, res);
    });
};

PemeriksaanKapal.removeAll = result => {
    sql.query("DELETE FROM pemeriksaan_kapal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} pemeriksaankapal`);
        result(null, res);
    });
};

module.exports = PemeriksaanKapal;

