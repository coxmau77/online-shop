const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).send("get index productos");
});

router.post('/', (request, response) => {
    response.status(200).send("post index productos");
});

module.exports = router;