module.exports = app => {
    const statuskepegawaian = require("../controllers/statuskepegawaian.js");

    // Create a new StatusKepegawaian
    app.post("/statuskepegawaian", statuskepegawaian.create);

    // Retrieve all StatusKepegawaians
    app.get("/statuskepegawaian", statuskepegawaian.findAll);

    // Retrieve a single StatusKepegawaian with id
    app.get("/statuskepegawaian/:id", statuskepegawaian.findOne);

    // Update a StatusKepegawaian with id
    app.put("/statuskepegawaian/:id", statuskepegawaian.update);

    // Delete a StatusKepegawaian with id
    app.delete("/statuskepegawaian/:id", statuskepegawaian.delete);

    // Create a new StatusKepegawaian
    app.delete("/statuskepegawaian", statuskepegawaian.deleteAll);
};
