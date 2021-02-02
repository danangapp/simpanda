const sql = require("../config/db.js");

// constructor
const PemeriksaanKapalCheck = function (pemeriksaankapalcheck) {
    this.question = pemeriksaankapalcheck.question;
};

PemeriksaanKapalCheck.create = (newPemeriksaanKapalCheck, result) => {
    sql.query("INSERT INTO pemeriksaan_kapal_check SET ?", newPemeriksaanKapalCheck, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created pemeriksaankapalcheck: ", { id: res.insertId, ...newPemeriksaanKapalCheck });
        result(null, { id: res.insertId, ...newPemeriksaanKapalCheck });
    });
};

PemeriksaanKapalCheck.findById = (id, result) => {
    sql.query(`SELECT * FROM pemeriksaan_kapal_check WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pemeriksaankapalcheck: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found PemeriksaanKapalCheck with the id
        result({ kind: "not_found" }, null);
    });
};

PemeriksaanKapalCheck.getAll = result => {
    sql.query("SELECT * FROM pemeriksaan_kapal_check", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pemeriksaankapalcheck: ", res);
        result(null, res);
    });
};

PemeriksaanKapalCheck.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'pemeriksaan_kapal_check'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pemeriksaankapalcheck: ", res);
        result(null, res);
    });
};

PemeriksaanKapalCheck.updateById = (id, pemeriksaankapalcheck, result) => {
    sql.query(
        "UPDATE pemeriksaan_kapal_check SET  question = ? WHERE id = ?",
        [pemeriksaankapalcheck.question, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found PemeriksaanKapalCheck with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated pemeriksaankapalcheck: ", { id: id, ...pemeriksaankapalcheck });
            result(null, { id: id, ...pemeriksaankapalcheck });
        }
    );
};

PemeriksaanKapalCheck.remove = (id, result) => {
    sql.query("DELETE FROM pemeriksaan_kapal_check WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PemeriksaanKapalCheck with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted pemeriksaankapalcheck with id: ", id);
        result(null, res);
    });
};

PemeriksaanKapalCheck.removeAll = result => {
    sql.query("DELETE FROM pemeriksaan_kapal_check", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} pemeriksaankapalcheck`);
        result(null, res);
    });
};

module.exports = PemeriksaanKapalCheck;

