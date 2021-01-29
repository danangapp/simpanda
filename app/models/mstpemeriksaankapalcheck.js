const sql = require("../config/db.js");

// constructor
const MstPemeriksaanKapalCheck = function (mstpemeriksaankapalcheck) {
    this.no = mstpemeriksaankapalcheck.no;
    this.question = mstpemeriksaankapalcheck.question;
};

MstPemeriksaanKapalCheck.create = (newMstPemeriksaanKapalCheck, result) => {
    sql.query("INSERT INTO mst_pemeriksaan_kapal_check SET ?", newMstPemeriksaanKapalCheck, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created mstpemeriksaankapalcheck: ", { id: res.insertId, ...newMstPemeriksaanKapalCheck });
        result(null, { id: res.insertId, ...newMstPemeriksaanKapalCheck });
    });
};

MstPemeriksaanKapalCheck.findById = (id, result) => {
    sql.query(`SELECT * FROM mst_pemeriksaan_kapal_check WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found mstpemeriksaankapalcheck: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found MstPemeriksaanKapalCheck with the id
        result({ kind: "not_found" }, null);
    });
};

MstPemeriksaanKapalCheck.getAll = result => {
    sql.query("SELECT * FROM mst_pemeriksaan_kapal_check", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("mstpemeriksaankapalcheck: ", res);
        result(null, res);
    });
};

MstPemeriksaanKapalCheck.updateById = (id, mstpemeriksaankapalcheck, result) => {
    sql.query(
        "UPDATE mst_pemeriksaan_kapal_check SET  no = ?, question = ? WHERE id = ?",
        [mstpemeriksaankapalcheck.no, mstpemeriksaankapalcheck.question, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MstPemeriksaanKapalCheck with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated mstpemeriksaankapalcheck: ", { id: id, ...mstpemeriksaankapalcheck });
            result(null, { id: id, ...mstpemeriksaankapalcheck });
        }
    );
};

MstPemeriksaanKapalCheck.remove = (id, result) => {
    sql.query("DELETE FROM mst_pemeriksaan_kapal_check WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MstPemeriksaanKapalCheck with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted mstpemeriksaankapalcheck with id: ", id);
        result(null, res);
    });
};

MstPemeriksaanKapalCheck.removeAll = result => {
    sql.query("DELETE FROM mst_pemeriksaan_kapal_check", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} mstpemeriksaankapalcheck`);
        result(null, res);
    });
};

module.exports = MstPemeriksaanKapalCheck;

