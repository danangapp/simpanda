module.exports = app => {
    const panduschedule = require("../controllers/panduschedule.js");

    // Create a new PanduSchedule
    app.post("/panduschedule", panduschedule.create);

    // Retrieve all PanduSchedules
    app.get("/panduschedule", panduschedule.findAll);

    // View Design PanduSchedules
    app.options("/panduschedule", panduschedule.design);

    // Retrieve a single PanduSchedule with id
    app.get("/panduschedule/:id", panduschedule.findOne);

    // Update a PanduSchedule with id
    app.put("/panduschedule", panduschedule.update);

    // Delete a PanduSchedule with id
    app.delete("/panduschedule/:id", panduschedule.delete);

};