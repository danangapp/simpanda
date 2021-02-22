const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const ApprovalStatus = function (approvalstatus) {
    this.nama = approvalstatus.nama;
};

ApprovalStatus.create = async(newApprovalStatus, result) => {
	try {
		const res = await query("INSERT INTO approval_status SET ?", newApprovalStatus);
		result(null, { id: res.insertId, ...newApprovalStatus });
	} catch (error) {
	    result(error, null);
	}
};

ApprovalStatus.findById = async (id, result) => {
    sql.query(`SELECT a.*  FROM approval_status a  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found ApprovalStatus with the id
        result({ kind: "not_found" }, null);
    });
};

ApprovalStatus.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.*  FROM approval_status a ";
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
		wheres += "a.nama LIKE '%" + param.q + "%'";	
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

ApprovalStatus.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'approval_status'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

ApprovalStatus.updateById = async(id, approvalstatus, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["nama"];
		for (var i in approvalstatus) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (approvalstatus[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(approvalstatus[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE approval_status SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...approvalstatus });
	} catch (error) {
	    result(error, null);
	}
};

ApprovalStatus.remove = (id, result) => {
    sql.query("DELETE FROM approval_status WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ApprovalStatus with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = ApprovalStatus;

