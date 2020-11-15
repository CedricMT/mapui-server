module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      age: Number,
      sex: String,
      drugs: [mongoose.Schema.Types.ObjectId],
      treatments: [mongoose.Schema.Types.ObjectId]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Patient = mongoose.model('patient', schema, 'patient');
  return Patient;
};
