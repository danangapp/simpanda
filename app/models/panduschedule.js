const sql = require("../config/db.js");

// constructor
const PanduSchedule = function (panduschedule) {
    this.date = panduschedule.date;
    this.cabang = panduschedule.cabang;
    this.pandu_jaga_id = panduschedule.pandu_jaga_id;
    this.pandu_jaga_nama = panduschedule.pandu_jaga_nama;
    this.status = panduschedule.status;
    this.keterangan = panduschedule.keterangan;
};

PanduSchedule.create = (newPanduSchedule, result) => {
    sql.query("INSERT INTO pandu_schedule SET ?", newPanduSchedule, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created panduschedule: ", { id: res.insertId, ...newPanduSchedule });
        result(null, { id: res.insertId, ...newPanduSchedule });
    });
};

PanduSchedule.findById = (id, result) => {
    sql.query(`SELECT * FROM pandu_schedule WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found panduschedule: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found PanduSchedule with the id
        result({ kind: "not_found" }, null);
    });
};

PanduSchedule.getAll = result => {
    sql.query("SELECT * FROM pandu_schedule", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("panduschedule: ", res);
        result(null, res);
    });
};

PanduSchedule.updateById = (id, panduschedule, result) => {
    sql.query(
        "UPDATE pandu_schedule SET  date = ?, cabang = ?, pandu_jaga_id = ?, pandu_jaga_nama = ?, status = ?, keterangan = ? WHERE id = ?",
        [panduschedule.date, panduschedule.cabang, panduschedule.pandu_jaga_id, panduschedule.pandu_jaga_nama, panduschedule.status, panduschedule.keterangan, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found PanduSchedule with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated panduschedule: ", { id: id, ...panduschedule });
            result(null, { id: id, ...panduschedule });
        }
    );
};

PanduSchedule.remove = (id, result) => {
    sql.query("DELETE FROM pandu_schedule WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found PanduSchedule with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted panduschedule with id: ", id);
        result(null, res);
    });
};

PanduSchedule.removeAll = result => {
    sql.query("DELETE FROM pandu_schedule", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} panduschedule`);
        result(null, res);
    });
};

module.exports = PanduSchedule;

