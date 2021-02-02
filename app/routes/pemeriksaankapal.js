module.exports = app => {
    const pemeriksaankapal = require("../controllers/pemeriksaankapal.js");

    // Create a new PemeriksaanKapal
    app.post("/pemeriksaankapal", pemeriksaankapal.create);

    // Retrieve all PemeriksaanKapals
    app.get("/pemeriksaankapal", pemeriksaankapal.findAll);

    // View Design PemeriksaanKapals
    app.options("/pemeriksaankapal", pemeriksaankapal.design);

    // Retrieve a single PemeriksaanKapal with id
    app.get("/pemeriksaankapal/:id", pemeriksaankapal.findOne);

    // Update a PemeriksaanKapal with id
    app.put("/pemeriksaankapal/:id", pemeriksaankapal.update);

    // Delete a PemeriksaanKapal with id
    app.delete("/pemeriksaankapal/:id", pemeriksaankapal.delete);

    // Create a new PemeriksaanKapal
    app.delete("/pemeriksaankapal", pemeriksaankapal.deleteAll);
};
