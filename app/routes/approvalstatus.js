module.exports = app => {
    const approvalstatus = require("../controllers/approvalstatus.js");

    // Create a new ApprovalStatus
    app.post("/approvalstatus", approvalstatus.create);

    // Retrieve all ApprovalStatuss
    app.get("/approvalstatus", approvalstatus.findAll);

    // View Design ApprovalStatuss
    app.options("/approvalstatus", approvalstatus.design);

    // Retrieve a single ApprovalStatus with id
    app.get("/approvalstatus/:id", approvalstatus.findOne);

    // Update a ApprovalStatus with id
    app.put("/approvalstatus/:id", approvalstatus.update);

    // Delete a ApprovalStatus with id
    app.delete("/approvalstatus/:id", approvalstatus.delete);

    // Create a new ApprovalStatus
    app.delete("/approvalstatus", approvalstatus.deleteAll);
};
