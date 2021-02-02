const sql = require("../config/db.js");

// constructor
const ApprovalStatus = function (approvalstatus) {
    this.name = approvalstatus.name;
};

ApprovalStatus.create = (newApprovalStatus, result) => {
    sql.query("INSERT INTO approval_status SET ?", newApprovalStatus, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created approvalstatus: ", { id: res.insertId, ...newApprovalStatus });
        result(null, { id: res.insertId, ...newApprovalStatus });
    });
};

ApprovalStatus.findById = (id, result) => {
    sql.query(`SELECT * FROM approval_status WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found approvalstatus: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ApprovalStatus with the id
        result({ kind: "not_found" }, null);
    });
};

ApprovalStatus.getAll = result => {
    sql.query("SELECT * FROM approval_status", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("approvalstatus: ", res);
        result(null, res);
    });
};

ApprovalStatus.updateById = (id, approvalstatus, result) => {
    sql.query(
        "UPDATE approval_status SET  name = ? WHERE id = ?",
        [approvalstatus.name, id],
        (err, res) => {
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

            console.log("updated approvalstatus: ", { id: id, ...approvalstatus });
            result(null, { id: id, ...approvalstatus });
        }
    );
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

        console.log("deleted approvalstatus with id: ", id);
        result(null, res);
    });
};

ApprovalStatus.removeAll = result => {
    sql.query("DELETE FROM approval_status", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} approvalstatus`);
        result(null, res);
    });
};

module.exports = ApprovalStatus;

