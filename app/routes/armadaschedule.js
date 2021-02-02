module.exports = app => {
    const armadaschedule = require("../controllers/armadaschedule.js");

    // Create a new ArmadaSchedule
    app.post("/armadaschedule", armadaschedule.create);

    // Retrieve all ArmadaSchedules
    app.get("/armadaschedule", armadaschedule.findAll);

    // View Design ArmadaSchedules
    app.options("/armadaschedule", armadaschedule.design);

    // Retrieve a single ArmadaSchedule with id
    app.get("/armadaschedule/:id", armadaschedule.findOne);

    // Update a ArmadaSchedule with id
    app.put("/armadaschedule/:id", armadaschedule.update);

    // Delete a ArmadaSchedule with id
    app.delete("/armadaschedule/:id", armadaschedule.delete);

    // Create a new ArmadaSchedule
    app.delete("/armadaschedule", armadaschedule.deleteAll);
};
