module.exports = app => {
    const assetstasiunequipment = require("../controllers/assetstasiunequipment.js");

    // Create a new AssetStasiunEquipment
    app.post("/assetstasiunequipment", assetstasiunequipment.create);

    // Retrieve all AssetStasiunEquipments
    app.get("/assetstasiunequipment", assetstasiunequipment.findAll);

    // View Design AssetStasiunEquipments
    app.options("/assetstasiunequipment", assetstasiunequipment.design);

    // Retrieve a single AssetStasiunEquipment with id
    app.get("/assetstasiunequipment/:id", assetstasiunequipment.findOne);

    // Update a AssetStasiunEquipment with id
    app.put("/assetstasiunequipment/:id", assetstasiunequipment.update);

    // Delete a AssetStasiunEquipment with id
    app.delete("/assetstasiunequipment/:id", assetstasiunequipment.delete);

    // Create a new AssetStasiunEquipment
    app.delete("/assetstasiunequipment", assetstasiunequipment.deleteAll);
};
