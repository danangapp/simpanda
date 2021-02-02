const sql = require("../config/db.js");

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

UserGroup.create = (newUserGroup, result) => {
    sql.query("INSERT INTO user_group SET ?", newUserGroup, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created usergroup: ", { id: res.insertId, ...newUserGroup });
        result(null, { id: res.insertId, ...newUserGroup });
    });
};

UserGroup.findById = (id, result) => {
    sql.query(`SELECT * FROM user_group WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found usergroup: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found UserGroup with the id
        result({ kind: "not_found" }, null);
    });
};

UserGroup.getAll = result => {
    sql.query("SELECT * FROM user_group", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("usergroup: ", res);
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

        console.log("usergroup: ", res);
        result(null, res);
    });
};

UserGroup.updateById = (id, usergroup, result) => {
    sql.query(
        "UPDATE user_group SET  nama = ?, keterangan = ?, cabang_id = ?, access_dashboard = ?, access_resource_pandu = ?, access_resource_pendukung = ?, access_resource_absensi = ?, access_asset_kapal = ?, access_asset_stasiun = ?, access_asset_rumah = ?, access_asset_absensi = ?, access_inspection_sarana = ?, access_inspection_pemeriksaan = ?, access_inspection_investigasi = ? WHERE id = ?",
        [usergroup.nama, usergroup.keterangan, usergroup.cabang_id, usergroup.access_dashboard, usergroup.access_resource_pandu, usergroup.access_resource_pendukung, usergroup.access_resource_absensi, usergroup.access_asset_kapal, usergroup.access_asset_stasiun, usergroup.access_asset_rumah, usergroup.access_asset_absensi, usergroup.access_inspection_sarana, usergroup.access_inspection_pemeriksaan, usergroup.access_inspection_investigasi, id],
        (err, res) => {
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

            console.log("updated usergroup: ", { id: id, ...usergroup });
            result(null, { id: id, ...usergroup });
        }
    );
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

        console.log("deleted usergroup with id: ", id);
        result(null, res);
    });
};

UserGroup.removeAll = result => {
    sql.query("DELETE FROM user_group", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} usergroup`);
        result(null, res);
    });
};

module.exports = UserGroup;

