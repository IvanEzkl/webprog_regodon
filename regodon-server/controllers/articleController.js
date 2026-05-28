const Article = require('../models/Article');

const normalizeContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((line) => String(line).trim()).filter(Boolean);
  }
  if (typeof content === 'string') {
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
};

const listArticles = async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const filter = includeInactive ? {} : { isActive: true };
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const filter = { name: req.params.slug };
    if (!includeInactive) {
      filter.isActive = true;
    }

    const article = await Article.findOne(filter);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const name = req.body.name ? String(req.body.name).trim() : '';
    const title = req.body.title ? String(req.body.title).trim() : '';

    if (!name || !title) {
      return res.status(400).json({ message: 'Slug and title are required.' });
    }

    const existing = await Article.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'Slug already exists.' });
    }

    const article = await Article.create({
      name,
      title,
      coverImage: req.body.coverImage ? String(req.body.coverImage).trim() : '',
      coverAlt: req.body.coverAlt ? String(req.body.coverAlt).trim() : '',
      content: normalizeContent(req.body.content),
      isActive: req.body.isActive === undefined ? true : Boolean(req.body.isActive),
    });

    res.status(201).json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.name ? String(req.body.name).trim() : '';
    const title = req.body.title ? String(req.body.title).trim() : '';

    if (!name || !title) {
      return res.status(400).json({ message: 'Slug and title are required.' });
    }

    const existing = await Article.findOne({ name, _id: { $ne: id } });
    if (existing) {
      return res.status(409).json({ message: 'Slug already exists.' });
    }

    const article = await Article.findByIdAndUpdate(
      id,
      {
        name,
        title,
        coverImage: req.body.coverImage ? String(req.body.coverImage).trim() : '',
        coverAlt: req.body.coverAlt ? String(req.body.coverAlt).trim() : '',
        content: normalizeContent(req.body.content),
        isActive: req.body.isActive === undefined ? true : Boolean(req.body.isActive),
      },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }

    res.json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const toggleArticleStatus = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }

    article.isActive = !article.isActive;
    await article.save();

    res.json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  listArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  toggleArticleStatus,
};
