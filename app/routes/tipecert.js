module.exports = app => {
    const tipecert = require("../controllers/tipecert.js");

    // Create a new TipeCert
    app.post("/tipecert", tipecert.create);

    // Retrieve all TipeCerts
    app.get("/tipecert", tipecert.findAll);

    // View Design TipeCerts
    app.options("/tipecert", tipecert.design);

    // Retrieve a single TipeCert with id
    app.get("/tipecert/:id", tipecert.findOne);

    // Update a TipeCert with id
    app.put("/tipecert/:id", tipecert.update);

    // Delete a TipeCert with id
    app.delete("/tipecert/:id", tipecert.delete);

    // Create a new TipeCert
    app.delete("/tipecert", tipecert.deleteAll);
};
