const Download = require("../models/download.js");
const f = require('./function');

exports.inspectionpemeriksaankapal = (req, res) => {
    Download.inspectionpemeriksaankapal(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving actionnames."
            });
        else {
            var obj = {};
            for (var i in data) {
                var no = parseInt(i) + 1;
                var baik = data[i].kondisi_id == 1 ? "1" : "";
                var rusak = data[i].kondisi_id == 2 ? "1" : "";
                obj["baik" + no] = baik;
                obj["rusak" + no] = rusak;
                obj["tglawal" + no] = f.toDate(data[i].tanggal_awal);
                obj["tglakhir" + no] = f.toDate(data[i].tanggal_akhir);
                obj["keterangan" + no] = data[i].keterangan;
            }

            f.downloadExcel('./report/inspection_pemeriksaan_kapal.xlsx', 'd:/danang1.xlsx', [obj]);
            res.send(data);
        }
    });
};
