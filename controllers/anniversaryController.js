const Anniversary = require('../models/Anniversary');
const cloudinary = require('../config/cloudinary');

exports.getBirthdays = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const q = search ? { name: { $regex: search, $options: 'i' } } : {};

    const total = await Anniversary.countDocuments(q);
    const items = await Anniversary.find(q)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ anniversaries: items, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch failed' });
  }
};

exports.createBirthday = async (req, res) => {
  try {
    const body = req.body;
    let photoPath = '', bannerPath = '', photoPublicId = '', bannerPublicId = '';

    if (process.env.USE_CLOUDINARY === 'true') {
      if (req.files?.photo?.[0]) {
        const r = await cloudinary.uploader.upload(req.files.photo[0].path, { folder: 'anniversaries' });
        photoPath = r.secure_url; photoPublicId = r.public_id;
      }
      if (req.files?.banner?.[0]) {
        const r = await cloudinary.uploader.upload(req.files.banner[0].path, { folder: 'anniversaries' });
        bannerPath = r.secure_url; bannerPublicId = r.public_id;
      }
    } else {
      photoPath = req.files?.photo?.[0]?.path || '';
      bannerPath = req.files?.banner?.[0]?.path || '';
    }

    const doc = await Anniversary.create({
      title: body.title,
      name: body.name,
      date: body.date,
      status: body.status || 'active',
      photo: photoPath, photoPublicId,
      banner: bannerPath, bannerPublicId,
      zoom: Number(body.zoom) || 1,
      offsetX: Number(body.offsetX) || 0,
      offsetY: Number(body.offsetY) || 0,
      bannerZoom: Number(body.bannerZoom) || 1,
      bannerX: Number(body.bannerX) || 0,
      bannerY: Number(body.bannerY) || 0
    });

    res.json({ message: 'Anniversary added', anniversary: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Create failed' });
  }
};

exports.updateBirthday = async (req, res) => {
  try {
    const id = req.params.id;
    const data = { ...req.body };
    const existing = await Anniversary.findById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    if (req.files?.photo?.[0]) {
      if (existing.photoPublicId && process.env.USE_CLOUDINARY === 'true')
        await cloudinary.uploader.destroy(existing.photoPublicId);
      if (process.env.USE_CLOUDINARY === 'true') {
        const r = await cloudinary.uploader.upload(req.files.photo[0].path, { folder: 'anniversaries' });
        data.photo = r.secure_url; data.photoPublicId = r.public_id;
      } else {
        data.photo = req.files.photo[0].path;
      }
    }

    if (req.files?.banner?.[0]) {
      if (existing.bannerPublicId && process.env.USE_CLOUDINARY === 'true')
        await cloudinary.uploader.destroy(existing.bannerPublicId);
      if (process.env.USE_CLOUDINARY === 'true') {
        const r = await cloudinary.uploader.upload(req.files.banner[0].path, { folder: 'anniversaries' });
        data.banner = r.secure_url; data.bannerPublicId = r.public_id;
      } else {
        data.banner = req.files.banner[0].path;
      }
    }

    const updated = await Anniversary.findByIdAndUpdate(id, data, { new: true });
    res.json({ message: 'Updated', anniversary: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.deleteBirthday = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await Anniversary.findById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    if (existing.photoPublicId && process.env.USE_CLOUDINARY === 'true')
      await cloudinary.uploader.destroy(existing.photoPublicId);
    if (existing.bannerPublicId && process.env.USE_CLOUDINARY === 'true')
      await cloudinary.uploader.destroy(existing.bannerPublicId);

    await Anniversary.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
};
