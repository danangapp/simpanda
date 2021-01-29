module.exports = app => {
    const mstrole = require("../controllers/mstrole.js");

    // Create a new MstRole
    app.post("/mstrole", mstrole.create);

    // Retrieve all MstRoles
    app.get("/mstrole", mstrole.findAll);

    // Retrieve a single MstRole with id
    app.get("/mstrole/:id", mstrole.findOne);

    // Update a MstRole with id
    app.put("/mstrole/:id", mstrole.update);

    // Delete a MstRole with id
    app.delete("/mstrole/:id", mstrole.delete);

    // Create a new MstRole
    app.delete("/mstrole", mstrole.deleteAll);
};
