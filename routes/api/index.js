const router = require('express').Router();
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');

router.use('/users', userRoutes);
router.use('/course', courseRoutes);

module.exports = router;