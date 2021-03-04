const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

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
		const user_access = newUserGroup.user_access;
		delete newUserGroup.user_access;
		const res = await query("INSERT INTO user_group SET ?", newUserGroup);
		for (var i in user_access) {
		    const x = user_access[i];
			x['user_group_id'] = res.insertId;
		
		    var header = "", value = "";
		    for (var a in x) {
		        const val = x[a];
		        header += a + ", ";
				if (a != "user_access") {
				    value += "'" + val + "', ";
				} else {
				    var fileName = f.uploadFile64('user_group', val);
				    value += "'" + fileName + "', ";
				}
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
			await query("INSERT INTO user_access (" + header + ") values (" + value + ")");
		}

		result(null, { id: res.insertId, ...newUserGroup });
	} catch (error) {
	    result(error, null);
	}
};

UserGroup.findById = async (id, result) => {
	const resQuery = await query("SELECT * FROM user_access WHERE user_group_id = '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as cabang FROM user_group a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id  WHERE a.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

		const user_access = { "user_access": resQuery }
		let merge = { ...res[0], ...user_access }	
        if (res.length) {
            result(null, merge);
            return;
        }

        // not found UserGroup with the id
        result({ kind: "not_found" }, null);
    });
};

UserGroup.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as cabang FROM user_group a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id ";
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
		wheres += "a.nama LIKE '%" + param.q + "%' OR a.keterangan LIKE '%" + param.q + "%' OR a.cabang_id LIKE '%" + param.q + "%' OR a.access_dashboard LIKE '%" + param.q + "%' OR a.access_resource_pandu LIKE '%" + param.q + "%' OR a.access_resource_pendukung LIKE '%" + param.q + "%' OR a.access_resource_absensi LIKE '%" + param.q + "%' OR a.access_asset_kapal LIKE '%" + param.q + "%' OR a.access_asset_stasiun LIKE '%" + param.q + "%' OR a.access_asset_rumah LIKE '%" + param.q + "%' OR a.access_asset_absensi LIKE '%" + param.q + "%' OR a.access_inspection_sarana LIKE '%" + param.q + "%' OR a.access_inspection_pemeriksaan LIKE '%" + param.q + "%' OR a.access_inspection_investigasi LIKE '%" + param.q + "%'";	
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
		const user_access = usergroup.user_access;
		var arr = ["user_group_id", "menu_id"]
		await query("DELETE FROM user_access WHERE user_group_id='" + id + "'");
		for (var i in user_access) {
		    const x = user_access[i];
		
		    var header = "", value = "";
			x['user_group_id'] = id;
		    for (var a in x) {
		        var val = x[a];
				var adadiTable = 0
				for (var b in arr) {
					if (a == arr[b]) {
						adadiTable = 1;
						break;
					}
				}

				if (adadiTable == 1) {
					header += a + ", ";
					value += "'" + val + "', ";
				}
		    }
		    value = value.substring(0, value.length - 2);
		    header = header.substring(0, header.length - 2);
		
			await query("INSERT INTO user_access (" + header + ") values (" + value + ")");
		}
		delete usergroup.user_access;

		var str = "", obj = [], no = 1;
		var arr = ["nama", "keterangan", "cabang_id", "access_dashboard", "access_resource_pandu", "access_resource_pendukung", "access_resource_absensi", "access_asset_kapal", "access_asset_stasiun", "access_asset_rumah", "access_asset_absensi", "access_inspection_sarana", "access_inspection_pemeriksaan", "access_inspection_investigasi"];
		for (var i in usergroup) {
			var adadiTable = 0
			for (var b in arr) {
				if (i == arr[b]) {
					adadiTable = 1;
					break;
				}
			}
		    if (usergroup[i] && adadiTable == 1) {
		        str += i + " = ?, ";
		        obj.push(usergroup[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		if (objek.action != null) {
			await query("INSERT INTO activity_log SET ?", objek);
		}
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

