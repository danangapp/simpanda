module.exports = app => {
    const pandujaga = require("../controllers/pandujaga.js");

    // Create a new PanduJaga
    app.post("/pandujaga", pandujaga.create);

    // Retrieve all PanduJagas
    app.get("/pandujaga", pandujaga.findAll);

    // View Design PanduJagas
    app.options("/pandujaga", pandujaga.design);

    // Retrieve a single PanduJaga with id
    app.get("/pandujaga/:id", pandujaga.findOne);

    // Update a PanduJaga with id
    app.put("/pandujaga/:id", pandujaga.update);

    // Delete a PanduJaga with id
    app.delete("/pandujaga/:id", pandujaga.delete);

};
