import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  contacts: [
    {
      name: { type: String },
      contact: {type: String}
    },
  ],
});

export default mongoose.model("UserYellowClass", userSchema);
