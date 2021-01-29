module.exports = app => {
    const panduschedule = require("../controllers/panduschedule.js");

    // Create a new PanduSchedule
    app.post("/panduschedule", panduschedule.create);

    // Retrieve all PanduSchedules
    app.get("/panduschedule", panduschedule.findAll);

    // Retrieve a single PanduSchedule with id
    app.get("/panduschedule/:id", panduschedule.findOne);

    // Update a PanduSchedule with id
    app.put("/panduschedule/:id", panduschedule.update);

    // Delete a PanduSchedule with id
    app.delete("/panduschedule/:id", panduschedule.delete);

    // Create a new PanduSchedule
    app.delete("/panduschedule", panduschedule.deleteAll);
};
