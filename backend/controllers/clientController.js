import Client from "../models/Client.js";

// POST /api/clients
export const createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/clients (for agent dashboard later)
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("property", "title location price");
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
