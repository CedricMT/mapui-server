const db = require("../models/index.js");
const Patient = db.patient;

// Create and Save a new Patient
exports.create = (req, res) => {
  // Create a Patient
  const patient = new Patient(req.body);

  // Save Patient in the database
  patient
    .save(patient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient."
      });
    });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
  const filter = req.query || {};

  Patient.find(filter)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients."
      });
    });
};

// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Patient.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Patient with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Patient with id=" + id });
    });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found!`
        });
      } else res.send({ message: "Patient was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Patient with id=" + id
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Patient.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
        });
      } else {
        res.send({
          message: "Patient was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id
      });
    });
};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {
  Patient.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Patients were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all patients."
      });
    });
};