const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Download = function (download) {
    this.nama = download.nama;
};

Download.inspectionpemeriksaankapal = (param, result) => {
    console.log(param);
    var query = "SELECT * FROM pemeriksaan_kapal_check_data WHERE pemeriksaan_kapal_id = " + param.id;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Download;

