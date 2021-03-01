const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const ArmadaSchedule = function (armadaschedule) {
    this.date = armadaschedule.date;
    this.cabang = armadaschedule.cabang;
    this.tipe_asset_id = armadaschedule.tipe_asset_id;
    this.asset_kapal_id = armadaschedule.asset_kapal_id;
    this.status = armadaschedule.status;
    this.jam_pengoperasian = armadaschedule.jam_pengoperasian;
    this.reliability = armadaschedule.reliability;
    this.keterangan = armadaschedule.keterangan;
    this.armada_jaga_id = armadaschedule.armada_jaga_id;
};

ArmadaSchedule.create = async (newArmadaSchedule, result) => {
    try {

        // result(null, { id: 1 });
        for (var a in newArmadaSchedule) {
            var header = "", value = "";
            var c = newArmadaSchedule[a];
            for (var b in c) {
                if (b != "armada_jaga") {
                    header += b + ", ";
                    value += "'" + c[b] + "', ";
                }
            }

            value = value.substring(0, value.length - 2);
            header = header.substring(0, header.length - 2);
            var res = await query("INSERT INTO armada_schedule (" + header + ") values (" + value + ")");

            for (var b in c) {
                if (b === "armada_jaga") {
                    var e = c[b];
                    for (var d in e) {
                        var g = e[d];
                        g['armada_schedule_id'] = res.insertId;
                        console.log(g);
                        var header1 = "", value1 = "";
                        for (var f in g) {
                            header1 += f + ", ";
                            value1 += "'" + g[f] + "', ";
                        }

                        value1 = value1.substring(0, value1.length - 2);
                        header1 = header1.substring(0, header1.length - 2);
                        await query("INSERT INTO armada_jaga (" + header1 + ") values (" + value1 + ")");
                    }
                }
            }
        }

        result(null, newArmadaSchedule);
    } catch (error) {
        result(error, null);
    }
};

ArmadaSchedule.findById = async (id, result) => {
    const resQuery = await query("SELECT * FROM armada_jaga WHERE armada_schedule_id = '" + id + "'");
    sql.query(`SELECT a.* , a1.nama as tipe_asset, a2.nama_asset as asset_kapal, a3.* FROM armada_schedule a  LEFT JOIN tipe_asset a1 ON a.tipe_asset_id = a1.id  LEFT JOIN asset_kapal a2 ON a.asset_kapal_id = a2.id  LEFT JOIN armada_jaga a3 ON a.armada_jaga_id = a3.id  WHERE a.id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        const armada_jaga = { "pandu_jaga": resQuery }
        let merge = { ...res[0], ...armada_jaga }
        if (res.length) {
            result(null, merge);
            return;
        }

        // not found ArmadaSchedule with the id
        result({ kind: "not_found" }, null);
    });
};

ArmadaSchedule.getAll = (param, result) => {
    const length = Object.keys(param).length;
    var wheres = "";
    var query = "SELECT a.* , a1.nama as cabang, a2.nama as status_absen, a3.nama as approval_status, a4.nama as ena, a5.nama as pandu_bandar_laut FROM armada_schedule a  LEFT JOIN cabang a1 ON a.cabang_id = a1.id  LEFT JOIN status_absen a2 ON a.status_absen_id = a2.id  LEFT JOIN approval_status a3 ON a.approval_status_id = a3.id  LEFT JOIN enable a4 ON a.enable = a4.id  LEFT JOIN pandu_bandar_laut a5 ON a.pandu_bandar_laut_id = a5.id ";
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
        wheres += "a.date LIKE '%" + param.q + "%' OR a.cabang_id LIKE '%" + param.q + "%' OR a.status_absen_id LIKE '%" + param.q + "%' OR a.keterangan LIKE '%" + param.q + "%' OR a.approval_status_id LIKE '%" + param.q + "%' OR a.enable LIKE '%" + param.q + "%' OR a.armada_jaga_id LIKE '%" + param.q + "%' OR a.pandu_bandar_laut_id LIKE '%" + param.q + "%'";
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

ArmadaSchedule.design = result => {
    sql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'simpanda' AND TABLE_NAME = 'armada_schedule'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

ArmadaSchedule.updateById = async (armadaschedule, result) => {
    try {

        for (var a in armadaschedule) {
            var c = armadaschedule[a];
            var str = "";
            for (var b in c) {
                if (b != "armada_jaga" && b != "armada_schedule_id") {
                    str += b + "='" + c[b] + "', ";
                }
            }

            str = str.substring(0, str.length - 2);
            await query("UPDATE armada_schedule SET " + str + " WHERE id = '" + c['armada_schedule_id'] + "'");
            await query("DELETE FROM armada_jaga WHERE armada_schedule_id = '" + c['armada_schedule_id'] + "'");

            for (var b in c) {
                if (b === "armada_jaga") {
                    var e = c[b];
                    for (var d in e) {
                        var g = e[d];
                        g['armada_schedule_id'] = c['armada_schedule_id'];
                        var header1 = "", value1 = "";
                        for (var f in g) {
                            header1 += f + ", ";
                            value1 += "'" + g[f] + "', ";
                        }

                        value1 = value1.substring(0, value1.length - 2);
                        header1 = header1.substring(0, header1.length - 2);
                        await query("INSERT INTO armada_jaga (" + header1 + ") values (" + value1 + ")");
                    }
                }
            }
        }

        result(null, armadaschedule);
    } catch (error) {
        result(error, null);
    }
};

ArmadaSchedule.remove = (id, result) => {
    sql.query("DELETE FROM armada_schedule WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ArmadaSchedule with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = ArmadaSchedule;

