module.exports = app => {
    const usergroup = require("../controllers/usergroup.js");

    // Create a new UserGroup
    app.post("/usergroup", usergroup.create);

    // Retrieve all UserGroups
    app.get("/usergroup", usergroup.findAll);

    // Retrieve a single UserGroup with id
    app.get("/usergroup/:id", usergroup.findOne);

    // Update a UserGroup with id
    app.put("/usergroup/:id", usergroup.update);

    // Delete a UserGroup with id
    app.delete("/usergroup/:id", usergroup.delete);

    // Create a new UserGroup
    app.delete("/usergroup", usergroup.deleteAll);
};
