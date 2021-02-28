const sql = require("../config/db.js");
const util = require('util');
const query = util.promisify(sql.query).bind(sql);
const f = require('../controllers/function');
var objek = new Object();

// constructor
const Dashboard = function (dashboard) {
    this.nama = dashboard.nama;
};

Dashboard.getAll = (param, result) => {
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

module.exports = Dashboard;

