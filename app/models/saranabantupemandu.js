const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

// constructor
const SaranaBantuPemandu = function (saranabantupemandu) {
    this.approval_status_id = saranabantupemandu.approval_status_id;
    this.cabang_id = saranabantupemandu.cabang_id;
    this.tanggal_pemeriksaan = saranabantupemandu.tanggal_pemeriksaan;
    this.pelaksana = saranabantupemandu.pelaksana;
};

SaranaBantuPemandu.create = async(newSaranaBantuPemandu, result) => {
	try {
		var obj = new Object();
		obj.date = newSaranaBantuPemandu.date;
		obj.item = newSaranaBantuPemandu.item;
		obj.action = newSaranaBantuPemandu.action;
		obj.user_id = newSaranaBantuPemandu.user_id;
		obj.remark = newSaranaBantuPemandu.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete newSaranaBantuPemandu.date;
		delete newSaranaBantuPemandu.item;
		delete newSaranaBantuPemandu.action;
		delete newSaranaBantuPemandu.user_id;
		delete newSaranaBantuPemandu.remark;

		const res = await query("INSERT INTO sarana_bantu_pemandu SET ?", newSaranaBantuPemandu);
		result(null, { id: res.insertId, ...newSaranaBantuPemandu });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemandu.findById = (id, result) => {
    sql.query(`SELECT * FROM sarana_bantu_pemandu WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found SaranaBantuPemandu with the id
        result({ kind: "not_found" }, null);
    });
};

SaranaBantuPemandu.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var query = "SELECT * FROM sarana_bantu_pemandu";
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

SaranaBantuPemandu.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'sarana_bantu_pemandu'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

SaranaBantuPemandu.updateById = async(id, saranabantupemandu, result) => {
	try {
		var obj = new Object();
		obj.date = SaranaBantuPemandu.date;
		obj.item = SaranaBantuPemandu.item;
		obj.action = SaranaBantuPemandu.action;
		obj.user_id = SaranaBantuPemandu.user_id;
		obj.remark = SaranaBantuPemandu.remark;
		await query("INSERT INTO activity_log SET ?", obj);
		delete SaranaBantuPemandu.date;
		delete SaranaBantuPemandu.item;
		delete SaranaBantuPemandu.action;
		delete SaranaBantuPemandu.user_id;
		delete SaranaBantuPemandu.remark;


		var str = "", obj = [], no = 1;
		for (var i in saranabantupemandu) {
		    if (saranabantupemandu[i]) {
		        str += i + " = ?, ";
		        obj.push(saranabantupemandu[i]);
		    }
		    no++;
		}
		obj.push(id);
		str = str.substring(0, str.length - 2);

		await query("UPDATE sarana_bantu_pemandu SET " + str + " WHERE id = ?", obj);
		result(null, { id: id, ...sarana_bantu_pemandu });
	} catch (error) {
	    result(error, null);
	}
};

SaranaBantuPemandu.remove = (id, result) => {
    sql.query("DELETE FROM sarana_bantu_pemandu WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SaranaBantuPemandu with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = SaranaBantuPemandu;

