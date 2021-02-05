module.exports = app => {
    const sertifikat = require("../controllers/sertifikat.js");

    // Create a new Sertifikat
    app.post("/sertifikat", sertifikat.create);

    // Retrieve all Sertifikats
    app.get("/sertifikat", sertifikat.findAll);

    // View Design Sertifikats
    app.options("/sertifikat", sertifikat.design);

    // Retrieve a single Sertifikat with id
    app.get("/sertifikat/:id", sertifikat.findOne);

    // Update a Sertifikat with id
    app.put("/sertifikat/:id", sertifikat.update);

    // Delete a Sertifikat with id
    app.delete("/sertifikat/:id", sertifikat.delete);

};
