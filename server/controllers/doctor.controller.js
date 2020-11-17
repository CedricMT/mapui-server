const db = require("../models/index.js");
const Doctor = db.doctor;

// Create and Save a new Doctor
exports.create = (req, res) => {
  // Create a Doctor
  const doctor = new Doctor(req.body);

  // Save Doctor in the database
  doctor
    .save(doctor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Doctor."
      });
    });
};

// Retrieve all Doctors from the database.
exports.findAll = (req, res) => {
  const filter = req.query || {};

  Doctor.find(filter)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctors."
      });
    });
};

// Find a single Doctor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Doctor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Doctor with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Doctor with id=" + id });
    });
};

// Find a multiple Doctor with an ids array
exports.findMultipleId = (req, res) => {
  const filter = req.query || {};

  if (!filter.ids) {
    throw new Error("Cannot request db for Doctor, ids params is missing.")
  }

  Doctor.find().where('_id').in(filter.ids)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctors."
      });
    });
}

// Update a Doctor by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Doctor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Doctor with id=${id}. Maybe Doctor was not found!`
        });
      } else res.send({ message: "Doctor was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Doctor with id=" + id
      });
    });
};

// Delete a Doctor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Doctor.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Doctor with id=${id}. Maybe Doctor was not found!`
        });
      } else {
        res.send({
          message: "Doctor was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Doctor with id=" + id
      });
    });
};

// Delete all Doctors from the database.
exports.deleteAll = (req, res) => {
  Doctor.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Doctors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all doctors."
      });
    });
};
