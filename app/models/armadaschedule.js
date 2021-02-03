const sql = require("../config/db.js");

// constructor
const ArmadaSchedule = function (armadaschedule) {
    this.date = armadaschedule.date;
    this.cabang = armadaschedule.cabang;
    this.kategori_armada = armadaschedule.kategori_armada;
    this.armada_id = armadaschedule.armada_id;
    this.status = armadaschedule.status;
    this.jam_pengoperasian = armadaschedule.jam_pengoperasian;
    this.reliabiliy = armadaschedule.reliabiliy;
    this.keterangan = armadaschedule.keterangan;
};

ArmadaSchedule.create = (newArmadaSchedule, result) => {
    sql.query("INSERT INTO armada_schedule SET ?", newArmadaSchedule, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created armadaschedule: ", { id: res.insertId, ...newArmadaSchedule });
        result(null, { id: res.insertId, ...newArmadaSchedule });
    });
};

ArmadaSchedule.findById = (id, result) => {
    sql.query(`SELECT * FROM armada_schedule WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found armadaschedule: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ArmadaSchedule with the id
        result({ kind: "not_found" }, null);
    });
};

ArmadaSchedule.getAll = result => {
    sql.query("SELECT * FROM armada_schedule", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("armadaschedule: ", res);
        result(null, res);
    });
};

ArmadaSchedule.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'armada_schedule'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("armadaschedule: ", res);
        result(null, res);
    });
};

ArmadaSchedule.updateById = (id, armadaschedule, result) => {
	var str = "", obj = [], no = 1;
	for (var i in armadaschedule) {
	    if (armadaschedule[i]) {
	        str += i + " = ?, ";
	        obj.push(armadaschedule[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE armada_schedule SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ArmadaSchedule with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...armadaschedule });
        }
    );
};

ArmadaSchedule.remove = (id, result) => {
    sql.query("DELETE FROM armada_schedule WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ArmadaSchedule with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted armadaschedule with id: ", id);
        result(null, res);
    });
};

ArmadaSchedule.removeAll = result => {
    sql.query("DELETE FROM armada_schedule", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} armadaschedule`);
        result(null, res);
    });
};

module.exports = ArmadaSchedule;

