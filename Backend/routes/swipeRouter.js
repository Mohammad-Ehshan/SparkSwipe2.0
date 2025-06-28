import express from "express";
import {
  recordSwipe,
  getNextCard,
  undoSwipe,
  getSwipeHistory
} from "../controllers/swipeController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Record a swipe action
router.post("/", isAuthenticated, recordSwipe);

// Get next swipeable project(s)
router.get("/next", isAuthenticated, getNextCard);

// Undo last swipe action
router.delete("/last", isAuthenticated, undoSwipe);

// Get swipe history
router.get("/history", isAuthenticated, getSwipeHistory);

export default router;