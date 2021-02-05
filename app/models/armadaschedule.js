const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

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
    this.date = armadaschedule.date;
    this.item = armadaschedule.item;
    this.action = armadaschedule.action;
    this.user_id = armadaschedule.user_id;
    this.remark = armadaschedule.remark;
};

ArmadaSchedule.create = async(newArmadaSchedule, result) => {
	try {

		const res = await query("INSERT INTO armada_schedule SET ?", newArmadaSchedule);
		result(null, { id: res.insertId, ...newArmadaSchedule });
	} catch (error) {
	    result(error, null);
	}
};

ArmadaSchedule.findById = (id, result) => {
    sql.query(`SELECT * FROM armada_schedule WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found ArmadaSchedule with the id
        result({ kind: "not_found" }, null);
    });
};

ArmadaSchedule.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM armada_schedule";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
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

        result(null, res);
    });
};

ArmadaSchedule.updateById = async(id, armadaschedule, result) => {
	try {



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

		await query("UPDATE armada_schedule SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
	} catch (error) {
	    result(error, null);
	}
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

        result(null, res);
    });
};

module.exports = ArmadaSchedule;

