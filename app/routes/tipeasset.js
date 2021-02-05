module.exports = app => {
    const tipeasset = require("../controllers/tipeasset.js");

    // Create a new TipeAsset
    app.post("/tipeasset", tipeasset.create);

    // Retrieve all TipeAssets
    app.get("/tipeasset", tipeasset.findAll);

    // View Design TipeAssets
    app.options("/tipeasset", tipeasset.design);

    // Retrieve a single TipeAsset with id
    app.get("/tipeasset/:id", tipeasset.findOne);

    // Update a TipeAsset with id
    app.put("/tipeasset/:id", tipeasset.update);

    // Delete a TipeAsset with id
    app.delete("/tipeasset/:id", tipeasset.delete);

};
