module.exports = app => {
    const action = require("../controllers/action.js");

    // Create a new Action
    app.post("/action", action.create);

    // Retrieve all Actions
    app.get("/action", action.findAll);

    // Retrieve a single Action with id
    app.get("/action/:id", action.findOne);

    // Update a Action with id
    app.put("/action/:id", action.update);

    // Delete a Action with id
    app.delete("/action/:id", action.delete);

    // Create a new Action
    app.delete("/action", action.deleteAll);
};
