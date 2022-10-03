const { Router } = require('express');

const router = Router();

router.get('/teste', (req, res) => res.status(200).send("oi"));

module.exports = router;