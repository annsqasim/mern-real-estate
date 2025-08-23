import express from "express";
import { getProperties, createProperty } from "../../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.post("/", createProperty);

// 👇 IMPORTANT: must be a default export
export default router;
