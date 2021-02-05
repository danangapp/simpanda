module.exports = app => {
    const investigasiinsiden = require("../controllers/investigasiinsiden.js");

    // Create a new InvestigasiInsiden
    app.post("/investigasiinsiden", investigasiinsiden.create);

    // Retrieve all InvestigasiInsidens
    app.get("/investigasiinsiden", investigasiinsiden.findAll);

    // View Design InvestigasiInsidens
    app.options("/investigasiinsiden", investigasiinsiden.design);

    // Retrieve a single InvestigasiInsiden with id
    app.get("/investigasiinsiden/:id", investigasiinsiden.findOne);

    // Update a InvestigasiInsiden with id
    app.put("/investigasiinsiden/:id", investigasiinsiden.update);

    // Delete a InvestigasiInsiden with id
    app.delete("/investigasiinsiden/:id", investigasiinsiden.delete);

};
