module.exports = app => {
    const download = require("../controllers/download.js");

    app.get("/download/inspectionpemeriksaankapal", download.inspectionpemeriksaankapal);

};
