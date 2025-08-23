import express from "express";
import { createViewing, getViewings, updateViewingStatus } from "../../controllers/viewingController.js";

const router = express.Router();

router.post("/", createViewing);
router.get("/", getViewings);
router.patch("/:id/status", updateViewingStatus);

export default router;
