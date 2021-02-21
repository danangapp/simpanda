module.exports = app => {
    const jeniscert = require("../controllers/jeniscert.js");

    // Create a new JenisCert
    app.post("/jeniscert", jeniscert.create);

    // Retrieve all JenisCerts
    app.get("/jeniscert", jeniscert.findAll);

    // View Design JenisCerts
    app.options("/jeniscert", jeniscert.design);

    // Retrieve a single JenisCert with id
    app.get("/jeniscert/:id", jeniscert.findOne);

    // Update a JenisCert with id
    app.put("/jeniscert/:id", jeniscert.update);

    // Delete a JenisCert with id
    app.delete("/jeniscert/:id", jeniscert.delete);

};
