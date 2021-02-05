module.exports = app => {
    const assetrumahdinas = require("../controllers/assetrumahdinas.js");

    // Create a new AssetRumahDinas
    app.post("/assetrumahdinas", assetrumahdinas.create);

    // Retrieve all AssetRumahDinass
    app.get("/assetrumahdinas", assetrumahdinas.findAll);

    // View Design AssetRumahDinass
    app.options("/assetrumahdinas", assetrumahdinas.design);

    // Retrieve a single AssetRumahDinas with id
    app.get("/assetrumahdinas/:id", assetrumahdinas.findOne);

    // Update a AssetRumahDinas with id
    app.put("/assetrumahdinas/:id", assetrumahdinas.update);

    // Delete a AssetRumahDinas with id
    app.delete("/assetrumahdinas/:id", assetrumahdinas.delete);

};
