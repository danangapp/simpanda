module.exports = app => {
    const pemeriksaankapalcheck = require("../controllers/pemeriksaankapalcheck.js");

    // Create a new PemeriksaanKapalCheck
    app.post("/pemeriksaankapalcheck", pemeriksaankapalcheck.create);

    // Retrieve all PemeriksaanKapalChecks
    app.get("/pemeriksaankapalcheck", pemeriksaankapalcheck.findAll);

    // View Design PemeriksaanKapalChecks
    app.options("/pemeriksaankapalcheck", pemeriksaankapalcheck.design);

    // Retrieve a single PemeriksaanKapalCheck with id
    app.get("/pemeriksaankapalcheck/:id", pemeriksaankapalcheck.findOne);

    // Update a PemeriksaanKapalCheck with id
    app.put("/pemeriksaankapalcheck/:id", pemeriksaankapalcheck.update);

    // Delete a PemeriksaanKapalCheck with id
    app.delete("/pemeriksaankapalcheck/:id", pemeriksaankapalcheck.delete);

};
