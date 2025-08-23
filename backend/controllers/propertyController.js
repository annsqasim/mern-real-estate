import Property from "../models/Property.js";

// GET /api/properties?page=&limit=&type=&location=&q=&priceMin=&priceMax=&bedMin=&bedMax=&bathMin=&bathMax=&areaMin=&areaMax=&amenities=a,b,c&sort=-createdAt
export const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      location,
      q,
      priceMin,
      priceMax,
      bedMin,
      bedMax,
      bathMin,
      bathMax,
      areaMin,
      areaMax,
      amenities,
      sort = "-createdAt"
    } = req.query;

    const match = { status: "active" };

    if (type) match.type = type;
    if (location) match.location = { $regex: location, $options: "i" };

    if (q) {
      const regex = new RegExp(q, "i");
      match.$or = [{ title: regex }, { location: regex }];
    }

    if (priceMin || priceMax) {
      match.price = {};
      if (priceMin) match.price.$gte = Number(priceMin);
      if (priceMax) match.price.$lte = Number(priceMax);
    }
    if (bedMin || bedMax) {
      match.bedrooms = {};
      if (bedMin) match.bedrooms.$gte = Number(bedMin);
      if (bedMax) match.bedrooms.$lte = Number(bedMax);
    }
    if (bathMin || bathMax) {
      match.bathrooms = {};
      if (bathMin) match.bathrooms.$gte = Number(bathMin);
      if (bathMax) match.bathrooms.$lte = Number(bathMax);
    }
    if (areaMin || areaMax) {
      match.area = {};
      if (areaMin) match.area.$gte = Number(areaMin);
      if (areaMax) match.area.$lte = Number(areaMax);
    }
    if (amenities) {
      const list = amenities.split(",").map(a => a.trim()).filter(Boolean);
      if (list.length) match.amenities = { $all: list };
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // allow e.g. sort=-price or sort=price
    const sortObj = {};
    sort.split(",").forEach(s => {
      if (!s) return;
      if (s.startsWith("-")) sortObj[s.slice(1)] = -1;
      else sortObj[s] = 1;
    });

    const [result] = await Property.aggregate([
      { $match: match },
      { $sort: Object.keys(sortObj).length ? sortObj : { createdAt: -1 } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [{ $skip: skip }, { $limit: limitNum }]
        }
      }
    ]);

    const total = result.total[0]?.count || 0;
    res.json({
      data: result.data,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/properties/:id
export const getPropertyById = async (req, res) => {
  try {
    const one = await Property.findById(req.params.id);
    if (!one) return res.status(404).json({ message: "Not found" });
    res.json(one);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// POST /api/properties  (Create)
export const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// HIDE property
export const archiveProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
