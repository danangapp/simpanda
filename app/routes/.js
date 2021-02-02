module.exports = app => {
    const  = require("../controllers/.js");

    // Create a new 
    app.post("/", .create);

    // Retrieve all s
    app.get("/", .findAll);

    // View Design s
    app.options("/", .design);

    // Retrieve a single  with id
    app.get("//:id", .findOne);

    // Update a  with id
    app.put("//:id", .update);

    // Delete a  with id
    app.delete("//:id", .delete);

    // Create a new 
    app.delete("/", .deleteAll);
};
