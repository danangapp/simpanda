module.exports = app => {
    const cabang = require("../controllers/cabang.js");

    // Create a new Cabang
    app.post("/cabang", cabang.create);

    // Retrieve all Cabangs
    app.get("/cabang", cabang.findAll);

    // Retrieve a single Cabang with id
    app.get("/cabang/:id", cabang.findOne);

    // Update a Cabang with id
    app.put("/cabang/:id", cabang.update);

    // Delete a Cabang with id
    app.delete("/cabang/:id", cabang.delete);

    // Create a new Cabang
    app.delete("/cabang", cabang.deleteAll);
};
