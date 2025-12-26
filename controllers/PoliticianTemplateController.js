const PoliticianTemplate = require('../models/PoliticianTemplate');

// Create new template
exports.createTemplate = async (req, res) => {
  try {
    const { politicianId, templateTitle, templateDescription } = req.body;
    const templateImages = (req.files || []).map(f => f.path); // Cloudinary URLs

    const newTemplate = await PoliticianTemplate.create({
      politicianId,
      templateTitle,
      templateDescription,
      templateImages
    });

    res.status(201).json({ success: true, data: newTemplate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await PoliticianTemplate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: templates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete template
exports.deleteTemplate = async (req, res) => {
  try {
    await PoliticianTemplate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Template deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
