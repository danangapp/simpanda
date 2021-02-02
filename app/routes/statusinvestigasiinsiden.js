module.exports = app => {
    const statusinvestigasiinsiden = require("../controllers/statusinvestigasiinsiden.js");

    // Create a new StatusInvestigasiInsiden
    app.post("/statusinvestigasiinsiden", statusinvestigasiinsiden.create);

    // Retrieve all StatusInvestigasiInsidens
    app.get("/statusinvestigasiinsiden", statusinvestigasiinsiden.findAll);

    // Retrieve a single StatusInvestigasiInsiden with id
    app.get("/statusinvestigasiinsiden/:id", statusinvestigasiinsiden.findOne);

    // Update a StatusInvestigasiInsiden with id
    app.put("/statusinvestigasiinsiden/:id", statusinvestigasiinsiden.update);

    // Delete a StatusInvestigasiInsiden with id
    app.delete("/statusinvestigasiinsiden/:id", statusinvestigasiinsiden.delete);

    // Create a new StatusInvestigasiInsiden
    app.delete("/statusinvestigasiinsiden", statusinvestigasiinsiden.deleteAll);
};
