import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";

import propertyRoutes from "./routes/propertyRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import viewingRoutes from "./routes/viewingRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/properties", propertyRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/viewings", viewingRoutes);

app.get("/api/test", (req, res) => {
    res.json({ message: "test route works" });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
