module.exports = app => {
    const pandubandarlaut = require("../controllers/pandubandarlaut.js");

    // Create a new PanduBandarLaut
    app.post("/pandubandarlaut", pandubandarlaut.create);

    // Retrieve all PanduBandarLauts
    app.get("/pandubandarlaut", pandubandarlaut.findAll);

    // View Design PanduBandarLauts
    app.options("/pandubandarlaut", pandubandarlaut.design);

    // Retrieve a single PanduBandarLaut with id
    app.get("/pandubandarlaut/:id", pandubandarlaut.findOne);

    // Update a PanduBandarLaut with id
    app.put("/pandubandarlaut/:id", pandubandarlaut.update);

    // Delete a PanduBandarLaut with id
    app.delete("/pandubandarlaut/:id", pandubandarlaut.delete);

};
