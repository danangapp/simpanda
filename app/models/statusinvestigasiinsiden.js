const sql = require("../config/db.js");

// constructor
const StatusInvestigasiInsiden = function (statusinvestigasiinsiden) {
    this.nama = statusinvestigasiinsiden.nama;
};

StatusInvestigasiInsiden.create = (newStatusInvestigasiInsiden, result) => {
    sql.query("INSERT INTO status_investigasi_insiden SET ?", newStatusInvestigasiInsiden, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created statusinvestigasiinsiden: ", { id: res.insertId, ...newStatusInvestigasiInsiden });
        result(null, { id: res.insertId, ...newStatusInvestigasiInsiden });
    });
};

StatusInvestigasiInsiden.findById = (id, result) => {
    sql.query(`SELECT * FROM status_investigasi_insiden WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found statusinvestigasiinsiden: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found StatusInvestigasiInsiden with the id
        result({ kind: "not_found" }, null);
    });
};

StatusInvestigasiInsiden.getAll = result => {
    sql.query("SELECT * FROM status_investigasi_insiden", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusinvestigasiinsiden: ", res);
        result(null, res);
    });
};

StatusInvestigasiInsiden.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'status_investigasi_insiden'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("statusinvestigasiinsiden: ", res);
        result(null, res);
    });
};

StatusInvestigasiInsiden.updateById = (id, statusinvestigasiinsiden, result) => {
	var str = "", obj = [], no = 1;
	for (var i in statusinvestigasiinsiden) {
	    if (statusinvestigasiinsiden[i]) {
	        str += i + " = ?, ";
	        obj.push(statusinvestigasiinsiden[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE status_investigasi_insiden SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StatusInvestigasiInsiden with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...statusinvestigasiinsiden });
        }
    );
};

StatusInvestigasiInsiden.remove = (id, result) => {
    sql.query("DELETE FROM status_investigasi_insiden WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StatusInvestigasiInsiden with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted statusinvestigasiinsiden with id: ", id);
        result(null, res);
    });
};

StatusInvestigasiInsiden.removeAll = result => {
    sql.query("DELETE FROM status_investigasi_insiden", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} statusinvestigasiinsiden`);
        result(null, res);
    });
};

module.exports = StatusInvestigasiInsiden;

