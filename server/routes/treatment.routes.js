module.exports = app => {
  const treatmentController = require("../controllers/treatment.controller.js");

  var router = require("express").Router();

  // Create a new Treatment
  router.post("/", treatmentController.create);

  // Retrieve all Treatment
  router.get("/", treatmentController.findAll);

  // Retrieve a single Treatment with id
  router.get("/id/:id", treatmentController.findOne);

  // Retrieve multiple Treatment with ids
  router.get("/ids", treatmentController.findMultipleId);

  // Update a Treatment with id
  router.put("/:id", treatmentController.update);

  // Delete a Treatment with id
  router.delete("/:id", treatmentController.delete);

  // Create a new Treatment
  router.delete("/", treatmentController.deleteAll);

  app.use("/api/treatment", router);
};
