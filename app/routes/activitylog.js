module.exports = app => {
    const activitylog = require("../controllers/activitylog.js");

    // Create a new ActivityLog
    app.post("/activitylog", activitylog.create);

    // Retrieve all ActivityLogs
    app.get("/activitylog", activitylog.findAll);

    // View Design ActivityLogs
    app.options("/activitylog", activitylog.design);

    // Retrieve a single ActivityLog with id
    app.get("/activitylog/:id", activitylog.findOne);

    // Update a ActivityLog with id
    app.put("/activitylog/:id", activitylog.update);

    // Delete a ActivityLog with id
    app.delete("/activitylog/:id", activitylog.delete);

    // Create a new ActivityLog
    app.delete("/activitylog", activitylog.deleteAll);
};
