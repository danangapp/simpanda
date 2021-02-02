const sql = require("../config/db.js");

// constructor
const StatusEvaluasiPelimpahan = function (statusevaluasipelimpahan) {
    this.nama = statusevaluasipelimpahan.nama;
};

StatusEvaluasiPelimpahan.create = (newStatusEvaluasiPelimpahan, result) => {
    sql.query("INSERT INTO status_evaluasi_pelimpahan SET ?", newStatusEvaluasiPelimpahan, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created statusevaluasipelimpahan: ", { id: res.insertId, ...newStatusEvaluasiPelimpahan });
        result(null, { id: res.insertId, ...newStatusEvaluasiPelimpahan });
    });
};

StatusEvaluasiPelimpahan.findById = (id, result) => {
    sql.query(`SELECT * FROM status_evaluasi_pelimpahan WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found statusevaluasipelimpahan: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found StatusEvaluasiPelimpahan with the id
        result({ kind: "not_found" }, null);
    });
};

StatusEvaluasiPelimpahan.getAll = result => {
    sql.query("SELECT * FROM status_evaluasi_pelimpahan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusevaluasipelimpahan: ", res);
        result(null, res);
    });
};

StatusEvaluasiPelimpahan.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_evaluasi_pelimpahan'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusevaluasipelimpahan: ", res);
        result(null, res);
    });
};

StatusEvaluasiPelimpahan.updateById = (id, statusevaluasipelimpahan, result) => {
    sql.query(
        "UPDATE status_evaluasi_pelimpahan SET  nama = ? WHERE id = ?",
        [statusevaluasipelimpahan.nama, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StatusEvaluasiPelimpahan with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated statusevaluasipelimpahan: ", { id: id, ...statusevaluasipelimpahan });
            result(null, { id: id, ...statusevaluasipelimpahan });
        }
    );
};

StatusEvaluasiPelimpahan.remove = (id, result) => {
    sql.query("DELETE FROM status_evaluasi_pelimpahan WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusEvaluasiPelimpahan with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted statusevaluasipelimpahan with id: ", id);
        result(null, res);
    });
};

StatusEvaluasiPelimpahan.removeAll = result => {
    sql.query("DELETE FROM status_evaluasi_pelimpahan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} statusevaluasipelimpahan`);
        result(null, res);
    });
};

module.exports = StatusEvaluasiPelimpahan;

