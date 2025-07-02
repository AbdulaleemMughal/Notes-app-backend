import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { createNote, deleteNote, getNotes } from "../controllers/noteController.js";

const notesRouter = express.Router();

notesRouter.post("/create-note", protectedRoute, createNote);
notesRouter.get("/get-notes", protectedRoute, getNotes);
notesRouter.delete("/delete-note/:id", protectedRoute, deleteNote);

export default notesRouter;