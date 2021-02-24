const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const ArmadaSchedule = function (armadaschedule) {
    this.date = armadaschedule.date;
    this.cabang = armadaschedule.cabang;
    this.tipe_asset_id = armadaschedule.tipe_asset_id;
    this.asset_kapal_id = armadaschedule.asset_kapal_id;
    this.status = armadaschedule.status;
    this.jam_pengoperasian = armadaschedule.jam_pengoperasian;
    this.reliability = armadaschedule.reliability;
    this.keterangan = armadaschedule.keterangan;
};

ArmadaSchedule.create = async(newArmadaSchedule, result) => {
	try {
		const res = await query("INSERT INTO armada_schedule SET ?", newArmadaSchedule);
		result(null, { id: res.insertId, ...newArmadaSchedule });
	} catch (error) {
	    result(error, null);
	}
};

ArmadaSchedule.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as tipe_asset, a2.nama_asset as asset_kapal FROM armada_schedule a  LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
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
    var wheres = "";
    var query = "SELECT a.* , a1.nama as tipe_asset, a2.nama_asset as asset_kapal FROM armada_schedule a  LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id ";
    if (length > 0) {
        wheres += " WHERE ";
        for (var i in param) {
        	if (i != "q") {
        	    var str = param[i];
        	    if (typeof str != "string") {
					var wherein = "";
					for (var x in str) {
					    wherein += str[x] + ", ";
					}
					wherein = wherein.substring(0, wherein.length - 2);
					wheres += "a." + i + " IN (" + wherein + ")";
					wheres += " and ";
        	    } else {
        	        wheres += "a." + i + " ='" + param[i] + "' and ";
        	    }
        	}
        }

        if (wheres.length > 7){
        	wheres = wheres.substring(0, wheres.length - 5);
        }
    }

	if (param.q) {
		wheres += wheres.length == 7 ? "(" : "AND (";
		wheres += "a.date LIKE '%" + param.q + "%' OR a.cabang LIKE '%" + param.q + "%' OR a.tipe_asset_id LIKE '%" + param.q + "%' OR a.asset_kapal_id LIKE '%" + param.q + "%' OR a.status LIKE '%" + param.q + "%' OR a.jam_pengoperasian LIKE '%" + param.q + "%' OR a.reliability LIKE '%" + param.q + "%' OR a.keterangan LIKE '%" + param.q + "%'";	
		wheres += ")";
   }

   query += wheres;
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
		var arr = ["date", "cabang", "tipe_asset_id", "asset_kapal_id", "status", "jam_pengoperasian", "reliability", "keterangan"];
		for (var i in armadaschedule) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (armadaschedule[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(armadaschedule[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE armada_schedule SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...armadaschedule });
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

