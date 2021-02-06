const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const UserGroup = function (usergroup) {
    this.nama = usergroup.nama;
    this.keterangan = usergroup.keterangan;
    this.cabang_id = usergroup.cabang_id;
    this.access_dashboard = usergroup.access_dashboard;
    this.access_resource_pandu = usergroup.access_resource_pandu;
    this.access_resource_pendukung = usergroup.access_resource_pendukung;
    this.access_resource_absensi = usergroup.access_resource_absensi;
    this.access_asset_kapal = usergroup.access_asset_kapal;
    this.access_asset_stasiun = usergroup.access_asset_stasiun;
    this.access_asset_rumah = usergroup.access_asset_rumah;
    this.access_asset_absensi = usergroup.access_asset_absensi;
    this.access_inspection_sarana = usergroup.access_inspection_sarana;
    this.access_inspection_pemeriksaan = usergroup.access_inspection_pemeriksaan;
    this.access_inspection_investigasi = usergroup.access_inspection_investigasi;
};

UserGroup.create = async(newUserGroup, result) => {
	try {

		const res = await query("INSERT INTO user_group SET ?", newUserGroup);
		result(null, { id: res.insertId, ...newUserGroup });
	} catch (error) {
	    result(error, null);
	}
};

UserGroup.findById = (id, result) => {
    sql.query(`SELECT * FROM user_group WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found UserGroup with the id
        result({ kind: "not_found" }, null);
    });
};

UserGroup.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT a.* , a1.nama as cabang FROM user_group a LEFT JOIN cabang a1 ON a.cabang_id = a1.id ";
    if (length > 0) {
        query += " WHERE ";
        for (var i in param) {
            var str = param[i];
            // var split = str.split(",");
            if (typeof str != "string") {
                query += "(";
                for (var x in str) {
                    query += "a." + i + " ='" + str[x] + "' or ";
                }
                query = query.substring(0, query.length - 4);
                query += ") and ";
            } else {
                query += "a." + i + " ='" + param[i] + "' and ";
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

UserGroup.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'user_group'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

UserGroup.updateById = async(id, usergroup, result) => {
	try {


		var str = "", obj = [], no = 1;
		for (var i in usergroup) {
		    if (usergroup[i]) {
		        str += i + " = ?, ";
		        obj.push(usergroup[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE user_group SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...usergroup });
	} catch (error) {
	    result(error, null);
	}
};

UserGroup.remove = (id, result) => {
    sql.query("DELETE FROM user_group WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found UserGroup with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = UserGroup;

