const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const TipeAsset = function (tipeasset) {
    this.nama = tipeasset.nama;
    this.type = tipeasset.type;
    this.sarana_config_question = tipeasset.sarana_config_question;
    this.flag = tipeasset.flag;
};

TipeAsset.create = async(newTipeAsset, result) => {
	try {
		const res = await query("INSERT INTO tipe_asset SET ?", newTipeAsset);
		result(null, { id: res.insertId, ...newTipeAsset });
	} catch (error) {
	    result(error, null);
	}
};

TipeAsset.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM tipe_asset a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found TipeAsset with the id
        result({ kind: "not_found" }, null);
    });
};

TipeAsset.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM tipe_asset a ";
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
		wheres += "a.nama LIKE '%" + param.q + "%' OR a.type LIKE '%" + param.q + "%' OR a.sarana_config_question LIKE '%" + param.q + "%' OR a.flag LIKE '%" + param.q + "%'";	
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

TipeAsset.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'tipe_asset'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

TipeAsset.updateById = async(id, tipeasset, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["nama", "type", "sarana_config_question", "flag"];
		for (var i in tipeasset) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (tipeasset[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(tipeasset[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE tipe_asset SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...tipeasset });
	} catch (error) {
	    result(error, null);
	}
};

TipeAsset.remove = (id, result) => {
    sql.query("DELETE FROM tipe_asset WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TipeAsset with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = TipeAsset;

