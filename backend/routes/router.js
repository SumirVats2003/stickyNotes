import express from "express";
import { userDB, noteDB } from "../db/schema.js";

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.send("This is a test route");
});

export default router;
