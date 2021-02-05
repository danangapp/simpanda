module.exports = app => {
    const kondisi = require("../controllers/kondisi.js");

    // Create a new Kondisi
    app.post("/kondisi", kondisi.create);

    // Retrieve all Kondisis
    app.get("/kondisi", kondisi.findAll);

    // View Design Kondisis
    app.options("/kondisi", kondisi.design);

    // Retrieve a single Kondisi with id
    app.get("/kondisi/:id", kondisi.findOne);

    // Update a Kondisi with id
    app.put("/kondisi/:id", kondisi.update);

    // Delete a Kondisi with id
    app.delete("/kondisi/:id", kondisi.delete);

};
