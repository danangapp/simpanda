module.exports = app => {
    const mstpemeriksaankapalcheck = require("../controllers/mstpemeriksaankapalcheck.js");

    // Create a new MstPemeriksaanKapalCheck
    app.post("/mstpemeriksaankapalcheck", mstpemeriksaankapalcheck.create);

    // Retrieve all MstPemeriksaanKapalChecks
    app.get("/mstpemeriksaankapalcheck", mstpemeriksaankapalcheck.findAll);

    // Retrieve a single MstPemeriksaanKapalCheck with id
    app.get("/mstpemeriksaankapalcheck/:id", mstpemeriksaankapalcheck.findOne);

    // Update a MstPemeriksaanKapalCheck with id
    app.put("/mstpemeriksaankapalcheck/:id", mstpemeriksaankapalcheck.update);

    // Delete a MstPemeriksaanKapalCheck with id
    app.delete("/mstpemeriksaankapalcheck/:id", mstpemeriksaankapalcheck.delete);

    // Create a new MstPemeriksaanKapalCheck
    app.delete("/mstpemeriksaankapalcheck", mstpemeriksaankapalcheck.deleteAll);
};
