module.exports = app => {
    const assetkapal = require("../controllers/assetkapal.js");

    // Create a new AssetKapal
    app.post("/assetkapal", assetkapal.create);

    // Retrieve all AssetKapals
    app.get("/assetkapal", assetkapal.findAll);

    // View Design AssetKapals
    app.options("/assetkapal", assetkapal.design);

    // Retrieve a single AssetKapal with id
    app.get("/assetkapal/:id", assetkapal.findOne);

    // Update a AssetKapal with id
    app.put("/assetkapal/:id", assetkapal.update);

    // Delete a AssetKapal with id
    app.delete("/assetkapal/:id", assetkapal.delete);

    // Create a new AssetKapal
    app.delete("/assetkapal", assetkapal.deleteAll);
};
