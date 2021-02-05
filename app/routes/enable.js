module.exports = app => {
    const enable = require("../controllers/enable.js");

    // Create a new Enable
    app.post("/enable", enable.create);

    // Retrieve all Enables
    app.get("/enable", enable.findAll);

    // View Design Enables
    app.options("/enable", enable.design);

    // Retrieve a single Enable with id
    app.get("/enable/:id", enable.findOne);

    // Update a Enable with id
    app.put("/enable/:id", enable.update);

    // Delete a Enable with id
    app.delete("/enable/:id", enable.delete);

};
