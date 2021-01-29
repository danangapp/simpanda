module.exports = app => {
    const msttipeasset = require("../controllers/msttipeasset.js");

    // Create a new MstTipeAsset
    app.post("/msttipeasset", msttipeasset.create);

    // Retrieve all MstTipeAssets
    app.get("/msttipeasset", msttipeasset.findAll);

    // Retrieve a single MstTipeAsset with id
    app.get("/msttipeasset/:id", msttipeasset.findOne);

    // Update a MstTipeAsset with id
    app.put("/msttipeasset/:id", msttipeasset.update);

    // Delete a MstTipeAsset with id
    app.delete("/msttipeasset/:id", msttipeasset.delete);

    // Create a new MstTipeAsset
    app.delete("/msttipeasset", msttipeasset.deleteAll);
};
