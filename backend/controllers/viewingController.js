import Viewing from "../models/Viewing.js";

export const createViewing = async (req, res) => {
  try {
    const viewing = new Viewing(req.body);
    await viewing.save();
    res.status(201).json(viewing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getViewings = async (req, res) => {
  try {
    const viewings = await Viewing.find()
      .populate("property", "title location")
      .populate("client", "name email");
    res.json(viewings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateViewingStatus = async (req, res) => {
  try {
    const viewing = await Viewing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(viewing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
