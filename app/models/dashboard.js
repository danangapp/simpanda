const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Dashboard = function (dashboard) {
    this.nama = dashboard.nama;
};

Dashboard.statisticresume = (param, result) => {
    var query = "SELECT cabang.id, cabang.nama, COUNT(cabang_id) as total FROM asset_kapal JOIN cabang ON asset_kapal.cabang_id = cabang.id WHERE enable = 1 AND approval_status_id = 1 AND tipe_asset_id = 2 GROUP BY cabang_id";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};


Dashboard.cetivicatevalidity = (param, result) => {
    var query = "SELECT tanggal_expire, (SELECT count(*) WHERE tanggal_expire < DATE_ADD( CURRENT_DATE (), INTERVAL 5 MONTH )) AS '< 5 Bulan', (SELECT count(*) WHERE tanggal_expire > DATE_ADD( CURRENT_DATE (), INTERVAL 5 MONTH ) AND tanggal_expire < DATE_ADD( CURRENT_DATE (), INTERVAL 11 MONTH )) AS '5 - 11 Bulan', (SELECT count(*) WHERE tanggal_expire > DATE_ADD( CURRENT_DATE (), INTERVAL 11 MONTH )) AS '> 11 Bulan' FROM sertifikat WHERE tanggal_expire > CURRENT_DATE () GROUP BY tanggal_expire";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Dashboard;

