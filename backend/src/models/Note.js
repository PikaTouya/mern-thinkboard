import mongoose from "mongoose";

// 1- cerate a schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // MongoDB wil generate createdAt, updatedAt fields
);

// 2- model based off of that schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
