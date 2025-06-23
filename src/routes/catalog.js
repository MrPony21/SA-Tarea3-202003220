const router = require('express').Router();
const { listTypes, listEnvs } = require('../controllers/catalogController');

router.get('/types', listTypes);
router.get('/environments', listEnvs);

module.exports = router;