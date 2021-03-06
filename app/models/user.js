const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const User = function (user) {
    this.username = user.username;
    this.nama = user.nama;
    this.password = user.password;
    this.user_group_id = user.user_group_id;
    this.accesToken = user.accesToken;
    this.refreshToken = user.refreshToken;
    this.role_id = user.role_id;
};

User.create = async (newUser, result) => {
    try {
        var rand = function () {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        var token = function () {
            return rand() + rand(); // to make it longer
        };
        newUser.accessToken = f.hashCode(token())
        newUser.password = f.hashCode(newUser.password)
        const res = await query("INSERT INTO user SET ?", newUser);
        delete newUser.password;
        result(null, { id: res.insertId, ...newUser });
    } catch (error) {
        result(error, null);
    }
};

User.findById = async (id, result) => {
    sql.query(`SELECT a.username, a.nama, a.user_group_id , a1.*, a.accessToken, a.refreshToken, a2.nama as cabang FROM user a  LEFT JOIN user_group a1 ON a.user_group_id = a1.id LEFT JOIN cabang a2 ON a1.cabang_id = a2.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.username, a.nama, a.user_group_id , a1.*, a2.nama as cabang FROM user a  LEFT JOIN user_group a1 ON a.user_group_id = a1.id  LEFT JOIN cabang a2 ON a1.cabang_id = a2.id ";

    var wheres = "";
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

        if (wheres.length > 7) {
            wheres = wheres.substring(0, wheres.length - 5);
        }
    }

    if (param.q) {
        wheres += wheres.length == 7 ? "(" : "AND (";
        wheres += "a.nama LIKE '%" + param.q + "%'";
        wheres += ")";
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

User.login = (req, result) => {
    req.password = f.hashCode(req.password);
    var query = "SELECT a.username, a.nama, a.user_group_id , a1.nama as user_group, a2.nama as role FROM user a  LEFT JOIN user_group a1 ON a.user_group_id = a1.id  LEFT JOIN role a2 ON a.role_id = a2.id WHERE a.username = '" + req.username + "' AND password = '" + req.password + "' ";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(res.length);
        if (res.length > 0)
            result(null, res);
        else
            result(null, "user atau login salah");
    });
};

User.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'user'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.updateById = async (id, user, result) => {
    try {

        var str = "", obj = [], no = 1;
        var arr = ["username", "nama", "password", "user_group_id", "role_id"];
        for (var i in user) {
            var adadiTable = 0
            for (var b in arr) {
                if (i == arr[b]) {
                    adadiTable = 1;
                    break;
                }
            }
            if (user[i] && adadiTable == 1) {
                str += i + " = ?, ";
                obj.push(user[i]);
            }
            no++;
        }
        obj.push(id);
        str = str.substring(0, str.length - 2);

        if (objek.action != null) {
            await query("INSERT INTO activity_log SET ?", objek);
        }
        await query("UPDATE user SET " + str + " WHERE id = ?", obj);
        result(null, { id: id, ...user });
    } catch (error) {
        result(error, null);
    }
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = User;

