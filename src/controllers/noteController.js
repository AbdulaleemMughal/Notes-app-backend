import Note from "../models/NoteModel.js";
import { validateNote } from "../utils/validateNote.js";

export const createNote = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { title, content } = req.body;

    validateNote(title, content);

    const newNote = await Note({
      title,
      content,
      user: loggedInUser._id,
    });

    await newNote.save();

    res.status(200).json({
      message: "Note created Successfully",
      data: newNote,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const notes = await Note.find({ user: loggedInUser._id }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      message: "Notes Found Successfully...",
      data: notes,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note Deleted Successfully...",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
