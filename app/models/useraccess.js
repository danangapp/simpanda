const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const UserAccess = function (useraccess) {
    this.user_group_id = useraccess.user_group_id;
    this.menu_id = useraccess.menu_id;
};

UserAccess.create = async(newUserAccess, result) => {
	try {
		const res = await query("INSERT INTO user_access SET ?", newUserAccess);
		result(null, { id: res.insertId, ...newUserAccess });
	} catch (error) {
	    result(error, null);
	}
};

UserAccess.findById = async (id, result) => {
    sql.query(`SELECT a.* , a1.nama as user_group, a2.nama as menu FROM user_access a  LEFT JOIN user_group a1 ON a.user_group_id = a1.id  LEFT JOIN menu a2 ON a.menu_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found UserAccess with the id
        result({ kind: "not_found" }, null);
    });
};

UserAccess.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as user_group, a2.nama as menu FROM user_access a  LEFT JOIN user_group a1 ON a.user_group_id = a1.id  LEFT JOIN menu a2 ON a.menu_id = a2.id ";
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
		wheres += "a.user_group_id LIKE '%" + param.q + "%' OR a.menu_id LIKE '%" + param.q + "%'";	
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

UserAccess.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'user_access'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

UserAccess.updateById = async(id, useraccess, result) => {
	try {

		var str = "", obj = [], no = 1;
		var arr = ["user_group_id", "menu_id"];
		for (var i in useraccess) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (useraccess[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(useraccess[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
		await query("UPDATE user_access SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...useraccess });
	} catch (error) {
	    result(error, null);
	}
};

UserAccess.remove = (id, result) => {
    sql.query("DELETE FROM user_access WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found UserAccess with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = UserAccess;

