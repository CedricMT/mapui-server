module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: String,
      code: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Drug = mongoose.model('drug', schema, 'drug');
  return Drug;
};
