const Birthday = require("../models/birthdayModel");
const { v2: cloudinary } = require("cloudinary");

exports.getBirthdays = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const total = await Birthday.countDocuments(query);

    const birthdays = await Birthday.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ birthdays, total, pages: Math.ceil(total / limit) });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.createBirthday = async (req, res) => {
  try {
    const {
      title, name, date, status,
      zoom, offsetX, offsetY,
      bannerZoom, bannerX, bannerY
    } = req.body;

    const photo = req.files?.photo?.[0] || null;
    const banner = req.files?.banner?.[0] || null;

    const birthday = await Birthday.create({
      title,
      name,
      date,
      status,

      photo: photo?.path || "",
      photoPublicId: photo?.filename || "",

      banner: banner?.path || "",
      bannerPublicId: banner?.filename || "",

      zoom, offsetX, offsetY,
      bannerZoom, bannerX, bannerY
    });

    res.json({ message: "Birthday Added", birthday });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Create failed" });
  }
};

exports.updateBirthday = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const bday = await Birthday.findById(id);

    if (req.files?.photo?.[0]) {
      if (bday.photoPublicId) await cloudinary.uploader.destroy(bday.photoPublicId);
      data.photo = req.files.photo[0].path;
      data.photoPublicId = req.files.photo[0].filename;
    }

    if (req.files?.banner?.[0]) {
      if (bday.bannerPublicId) await cloudinary.uploader.destroy(bday.bannerPublicId);
      data.banner = req.files.banner[0].path;
      data.bannerPublicId = req.files.banner[0].filename;
    }

    const updated = await Birthday.findByIdAndUpdate(id, data, { new: true });

    res.json({ message: "Birthday Updated", birthday: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteBirthday = async (req, res) => {
  try {
    const bday = await Birthday.findById(req.params.id);

    if (bday.photoPublicId)
      await cloudinary.uploader.destroy(bday.photoPublicId);

    if (bday.bannerPublicId)
      await cloudinary.uploader.destroy(bday.bannerPublicId);

    await Birthday.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};
