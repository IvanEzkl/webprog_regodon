const express = require('express');
const {
    listArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
    toggleArticleStatus,
} = require('../controllers/articleController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', listArticles);
router.get('/slug/:slug', getArticleBySlug);
router.post('/', requireAuth, requireAdmin, createArticle);
router.put('/:id', requireAuth, requireAdmin, updateArticle);
router.patch('/:id/status', requireAuth, requireAdmin, toggleArticleStatus);

module.exports = router;