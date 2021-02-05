const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const ApprovalStatus = function (approvalstatus) {
    this.name = approvalstatus.name;
};

ApprovalStatus.create = async(newApprovalStatus, result) => {
	try {


		const res = await query("INSERT INTO approval_status SET ?", newApprovalStatus);
		result(null, { id: res.insertId, ...newApprovalStatus });
	} catch (error) {
	    result(error, null);
	}
};

ApprovalStatus.findById = (id, result) => {
    sql.query(`SELECT * FROM approval_status WHERE id = ${id}`, (err, res) => {
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
    var query = "SELECT * FROM approval_status";
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
		for (var i in approvalstatus) {
		    if (approvalstatus[i]) {
		        str += i + " = ?, ";
		        obj.push(approvalstatus[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE approval_status SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...personil });
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

