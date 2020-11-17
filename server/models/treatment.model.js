module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      start: Date,
      end: Date,
      text: String,
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Treatment = mongoose.model('treatment', schema, 'treatment');
  return Treatment;
};
