module.exports = app => {
    const armadajaga = require("../controllers/armadajaga.js");

    // Create a new ArmadaJaga
    app.post("/armadajaga", armadajaga.create);

    // Retrieve all ArmadaJagas
    app.get("/armadajaga", armadajaga.findAll);

    // View Design ArmadaJagas
    app.options("/armadajaga", armadajaga.design);

    // Retrieve a single ArmadaJaga with id
    app.get("/armadajaga/:id", armadajaga.findOne);

    // Update a ArmadaJaga with id
    app.put("/armadajaga/:id", armadajaga.update);

    // Delete a ArmadaJaga with id
    app.delete("/armadajaga/:id", armadajaga.delete);

};
