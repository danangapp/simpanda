const sql = require("../config/db.js");

// constructor
const ActivityLog = function (activitylog) {
    this.date = activitylog.date;
    this.item = activitylog.item;
    this.action = activitylog.action;
    this.user_id = activitylog.user_id;
    this.remark = activitylog.remark;
};

ActivityLog.create = (newActivityLog, result) => {
    sql.query("INSERT INTO activity_log SET ?", newActivityLog, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created activitylog: ", { id: res.insertId, ...newActivityLog });
        result(null, { id: res.insertId, ...newActivityLog });
    });
};

ActivityLog.findById = (id, result) => {
    sql.query(`SELECT * FROM activity_log WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found activitylog: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ActivityLog with the id
        result({ kind: "not_found" }, null);
    });
};

ActivityLog.getAll = result => {
    sql.query("SELECT * FROM activity_log", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("activitylog: ", res);
        result(null, res);
    });
};

ActivityLog.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'activity_log'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("activitylog: ", res);
        result(null, res);
    });
};

ActivityLog.updateById = (id, activitylog, result) => {
	var str = "", obj = [], no = 1;
	for (var i in activitylog) {
	    if (activitylog[i]) {
	        str += i + " = ?, ";
	        obj.push(activitylog[i]);
	    }
	    no++;
	}
	obj.push(id);
	str = str.substring(0, str.length - 2);

    sql.query(
        "UPDATE activity_log SET " + str + " WHERE id = ?",
        obj,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ActivityLog with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...activitylog });
        }
    );
};

ActivityLog.remove = (id, result) => {
    sql.query("DELETE FROM activity_log WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ActivityLog with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted activitylog with id: ", id);
        result(null, res);
    });
};

ActivityLog.removeAll = result => {
    sql.query("DELETE FROM activity_log", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} activitylog`);
        result(null, res);
    });
};

module.exports = ActivityLog;

