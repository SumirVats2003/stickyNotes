import express from "express";
import { userDB, noteDB } from "../db/schema.js";

const router = express.Router();

/**
 * Routes
 * 1. POST /login
 * 2. POST /register
 * 3. GET /:userId -> get all user notes
 * 4. GET /:userId/:noteId -> get a user note
 * 5. POST /:userId/newnote -> create a new note
 * 6. PUT /:userId/:noteId -> update a note
 * 7. DELETE /:userId/:noteId -> delete a note
 */

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userDB.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).send("POST /login : Server ran into an error");
  }
});

// POST /register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await userDB.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await userDB.create({ email, password });
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    res.status(500).send("POST /register : Server ran into an error");
  }
});

// GET /:userId -> get all user notes
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notes = await noteDB.find({ userId });
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found for the user" });
    }

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).send("GET /:userId : Server ran into an error");
  }
});

// GET /:userId/:noteId -> get a user note
router.get("/:userId/:noteId", async (req, res) => {
  const { userId, noteId } = req.params;

  try {
    const note = await noteDB.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).send("GET /:userId/:noteId : Server ran into an error");
  }
});

// POST /:userId/newnote -> create a new note
router.post("/:userId/newnote", async (req, res) => {
  const { userId } = req.params;
  const { title, description, color } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    const newNote = await noteDB.create({ userId, title, description, color });
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (err) {
    res.status(500).send("POST /:userId/newnote : Server ran into an error");
  }
});

// PUT /:userId/:noteId -> update a note
router.put("/:userId/:noteId", async (req, res) => {
  const { userId, noteId } = req.params;
  const { title, description, color } = req.body;

  try {
    const updatedNote = await noteDB.findOneAndUpdate(
      { _id: noteId, userId },
      { title, description, color },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (err) {
    res.status(500).send("PUT /:userId/:noteId : Server ran into an error");
  }
});

// DELETE /:userId/:noteId -> delete a note
router.delete("/:userId/:noteId", async (req, res) => {
  const { userId, noteId } = req.params;

  try {
    const deletedNote = await noteDB.findOneAndDelete({ _id: noteId, userId });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).send("DELETE /:userId/:noteId : Server ran into an error");
  }
});

export default router;
