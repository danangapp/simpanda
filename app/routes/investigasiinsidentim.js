module.exports = app => {
    const investigasiinsidentim = require("../controllers/investigasiinsidentim.js");

    // Create a new InvestigasiInsidenTim
    app.post("/investigasiinsidentim", investigasiinsidentim.create);

    // Retrieve all InvestigasiInsidenTims
    app.get("/investigasiinsidentim", investigasiinsidentim.findAll);

    // View Design InvestigasiInsidenTims
    app.options("/investigasiinsidentim", investigasiinsidentim.design);

    // Retrieve a single InvestigasiInsidenTim with id
    app.get("/investigasiinsidentim/:id", investigasiinsidentim.findOne);

    // Update a InvestigasiInsidenTim with id
    app.put("/investigasiinsidentim/:id", investigasiinsidentim.update);

    // Delete a InvestigasiInsidenTim with id
    app.delete("/investigasiinsidentim/:id", investigasiinsidentim.delete);

};
