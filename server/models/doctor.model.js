module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      speciality: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Doctor = mongoose.model('doctor', schema, 'doctor');
  return Doctor;
};
