module.exports = app => {
    const assetstasiunequipment2 = require("../controllers/assetstasiunequipment2.js");

    // Create a new AssetStasiunEquipment2
    app.post("/assetstasiunequipment2", assetstasiunequipment2.create);

    // Retrieve all AssetStasiunEquipment2s
    app.get("/assetstasiunequipment2", assetstasiunequipment2.findAll);

    // View Design AssetStasiunEquipment2s
    app.options("/assetstasiunequipment2", assetstasiunequipment2.design);

    // Retrieve a single AssetStasiunEquipment2 with id
    app.get("/assetstasiunequipment2/:id", assetstasiunequipment2.findOne);

    // Update a AssetStasiunEquipment2 with id
    app.put("/assetstasiunequipment2/:id", assetstasiunequipment2.update);

    // Delete a AssetStasiunEquipment2 with id
    app.delete("/assetstasiunequipment2/:id", assetstasiunequipment2.delete);

};
