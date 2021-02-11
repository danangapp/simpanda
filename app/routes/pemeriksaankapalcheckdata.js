module.exports = app => {
    const pemeriksaankapalcheckdata = require("../controllers/pemeriksaankapalcheckdata.js");

    // Create a new PemeriksaanKapalCheckData
    app.post("/pemeriksaankapalcheckdata", pemeriksaankapalcheckdata.create);

    // Retrieve all PemeriksaanKapalCheckDatas
    app.get("/pemeriksaankapalcheckdata", pemeriksaankapalcheckdata.findAll);

    // View Design PemeriksaanKapalCheckDatas
    app.options("/pemeriksaankapalcheckdata", pemeriksaankapalcheckdata.design);

    // Retrieve a single PemeriksaanKapalCheckData with id
    app.get("/pemeriksaankapalcheckdata/:id", pemeriksaankapalcheckdata.findOne);

    // Update a PemeriksaanKapalCheckData with id
    app.put("/pemeriksaankapalcheckdata/:id", pemeriksaankapalcheckdata.update);

    // Delete a PemeriksaanKapalCheckData with id
    app.delete("/pemeriksaankapalcheckdata/:id", pemeriksaankapalcheckdata.delete);

};
