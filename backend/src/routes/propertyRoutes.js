import express from "express";
import {
  getProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  archiveProperty
} from "../../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.patch("/:id/archive", archiveProperty);

export default router;
