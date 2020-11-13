module.exports = app => {
  const patientController = require("../controllers/patient.controller.js");

  var router = require("express").Router();

  // Create a new Patient
  router.post("/", patientController.create);

  // Retrieve all Patient
  router.get("/", patientController.findAll);

  // Retrieve a single Patient with id
  router.get("/:id", patientController.findOne);

  // Update a Patient with id
  router.put("/:id", patientController.update);

  // Delete a Patient with id
  router.delete("/:id", patientController.delete);

  // Create a new Patient
  router.delete("/", patientController.deleteAll);

  app.use("/api/patient", router);
};
