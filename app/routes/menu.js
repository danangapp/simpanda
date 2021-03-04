module.exports = app => {
    const menu = require("../controllers/menu.js");

    // Create a new Menu
    app.post("/menu", menu.create);

    // Retrieve all Menus
    app.get("/menu", menu.findAll);

    // View Design Menus
    app.options("/menu", menu.design);

    // Retrieve a single Menu with id
    app.get("/menu/:id", menu.findOne);

    // Update a Menu with id
    app.put("/menu/:id", menu.update);

    // Delete a Menu with id
    app.delete("/menu/:id", menu.delete);

};
